import { inject, injectable } from "inversify";
import { types } from "../config/types";
import { IUrlRepository } from "../interfaces/IUrlRepository";
import { IUrlService } from "../interfaces/IUrlService";
import { CreateShortUrl, GetShortUrl, RedirectUrlType } from "../types/urlTypes";
import { getCache, setCache } from "../config/cache";

@injectable()
export default class UrlService implements IUrlService {
    private _urlRepository: IUrlRepository;

    constructor(@inject(types.IUrlRepository) urlRepo: IUrlRepository) {
        this._urlRepository = urlRepo;
    }

    async handleRedirect(data: RedirectUrlType): Promise<string> {
        const cacheKey = `redirect:${data.alias}`;

        try {
            // Check if alias is cached
            const cachedUrl = await getCache(cacheKey);
            if (cachedUrl) {
                return cachedUrl;
            }

            const urlData = await this._urlRepository.findUrlByAlias(data.alias);
            if (!urlData) throw new Error('Short URL not found');

            // Store in cache for 24 hours
            await setCache(cacheKey, urlData.longUrl, 24 * 60 * 60);

            await this._urlRepository.logRedirectEvent({
                alias: data.alias,
                userAgent: data.userAgent,
                ipAddress: data.ipAddress,
            });

            return urlData.longUrl;
        } catch (serviceErr) {
            throw new Error(`[Service][handleRedirect] redirect failed due to ${serviceErr}`);
        }
    }

    async createShortenUrl(url: CreateShortUrl): Promise<GetShortUrl> {
        console.log('[service] create url payload', url);
        try {
            const longUrl = url.longUrl;
            const customAlias = url.customAlias;
            const topic = url.topic;
            const userId = url.userId;

            if (!longUrl) throw new Error('longUrl is required');

            const existingUrl = await this._urlRepository.findUrlByAlias(customAlias);
            if (existingUrl) throw new Error('Custom alias is already taken');

            const shortUrl = `https://tinyurl.com/${customAlias}`;

            const response = await this._urlRepository.createShortenUrl({
                longUrl,
                customAlias,
                topic,
                shortUrl,
                userId,
            });

            // Store in cache for 24 hours
            await setCache(`redirect:${customAlias}`, longUrl, 24 * 60 * 60);

            return response as GetShortUrl;
        } catch (serviceErr) {
            throw new Error(`[Service][createShortenUrl] URL creation failed due to ${serviceErr}`);
        }
    }
}
