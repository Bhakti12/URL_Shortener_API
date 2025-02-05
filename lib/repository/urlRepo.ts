import { injectable } from "inversify";
import { IUrlRepository } from "../interfaces/IUrlRepository";
import analyticsSchema from "../models/analyticsSchema";
import urlSchema from "../models/urlSchema";
import { AnalyticsUrl, CreateShortUrl, GetShortUrl, RedirectUrlType } from "../types/urlTypes";

@injectable()
export default class urlRepository implements IUrlRepository {
    async logRedirectEvent(data: RedirectUrlType): Promise<AnalyticsUrl> {
        try {
            const logEntry = await analyticsSchema.create({ alias: data.alias, ipAddress: data.ipAddress, userAgent: data.userAgent });
            const res = { alias: logEntry.alias, ipAddress: logEntry.ipAddress, userAgent: logEntry.userAgent, timestamp: logEntry.timestamp};
            return res as AnalyticsUrl;
        } catch (serviceErr) {
            throw new Error(`[Repo][logRedirectEvent] redirect log failed due to ${serviceErr}`);
        }
    }

    async createShortenUrl(url: CreateShortUrl): Promise<GetShortUrl> {
        console.log('[repo] request body', url);
        try {
            const longUrl = url.longUrl;
            const calias = url.customAlias;
            const topic = url.topic;
            const shortUrl = url.shortUrl;
            const userId = url.userId;

            const response = await urlSchema.create({ longUrl: longUrl, alias: calias, topic: topic, shortUrl: shortUrl, userId: userId });

            return response as GetShortUrl;
        } catch (serviceErr) {
            throw new Error(`[Repo][createShortenUrl] url creation failed due to ${serviceErr}`);
        }
    }

    async findUrlByAlias(alias: string): Promise<any> {
        try {
            const response = await urlSchema.findOne({ customAlias: alias });
            return response;
        } catch (serviceErr) {
            throw new Error(`[Repo][findUrlByAlias] alias find failed due to ${serviceErr}`);
        }
    }
}