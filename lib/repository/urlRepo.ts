import { IUrlRepository } from "../interfaces/IUrlRepository";
import urlSchema from "../models/urlSchema";
import { CreateShortUrl, GetShortUrl } from "../types/urlTypes";

export default class urlRepository implements IUrlRepository {
    async createShortenUrl(url: CreateShortUrl): Promise<GetShortUrl> {
        try {
            const longUrl = url.longUrl;
            const alias = url.customAlias;
            const topic = url.topic;
            const shortUrl = url.shortUrl;
            const userId = url.userId;

            const response = await urlSchema.create({ longUrl: longUrl, customAlias: alias, topic: topic, shortUrl: shortUrl, userId: userId });

            return response as GetShortUrl;
        } catch (serviceErr) {
            throw new Error(`[createShortenUrl] url creation failed due to ${serviceErr}`);
        }
    }

    async findUrlByAlias(alias: string): Promise<any> {
        try{
            const response = await urlSchema.findOne({ customAlias: alias });
            return response;
        } catch(serviceErr) {
            throw new Error(`[findUrlByAlias] alias find failed due to ${serviceErr}`);
        }
    }
}