import { inject } from "inversify";
import { types } from "../config/types";
import { IUrlRepository } from "../interfaces/IUrlRepository";
import { IUrlService } from "../interfaces/IUrlService";
import { CreateShortUrl, GetShortUrl } from "../types/urlTypes";

export default class urlService implements IUrlService {

    private _urlRepository: IUrlRepository;
    constructor(
      @inject(types.IUrlRepository) urlRepo: IUrlRepository
    ) {
      this._urlRepository = urlRepo;
    }

    async createShortenUrl(url: CreateShortUrl): Promise<GetShortUrl> {
        try {
            const longUrl = url.longUrl;
            const custonmAlias = url.customAlias;
            const topic = url.topic;
            const userId = url.userId;

            if (!longUrl) throw new Error('longUrl is required');

            const existingUrl = await this._urlRepository.findUrlByAlias(custonmAlias);

            if (existingUrl) throw new Error('Custom alias is already taken');

            const shortUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/${custonmAlias}`;

            const response = await this._urlRepository.createShortenUrl({ longUrl, customAlias: custonmAlias, topic, shortUrl, userId });

            return response as GetShortUrl;
        } catch (serviceErr) {
            throw new Error(`[service][createShortenUrl] url creation failed due to ${serviceErr}`);
        }
    }

}