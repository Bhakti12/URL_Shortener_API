import { inject, injectable } from "inversify";
import { IAnalyticsService } from "../interfaces/IAnalyticsService";
import { AnalyticsByAliasData, AnalyticsByTopicData } from "../types/urlTypes";
import { IAnalyticsRepository } from "../interfaces/IAnalyticsRepository";
import { types } from "../config/types";
import { getCache, setCache } from "../config/cache";

@injectable()
export default class AnalyticsService implements IAnalyticsService {
    private _analyticsRepository: IAnalyticsRepository;

    constructor(
        @inject(types.IAnalyticsRepository) analyticsRepo: IAnalyticsRepository
    ) {
        this._analyticsRepository = analyticsRepo;
    }

    async getAnalyticsbyAlias(alias: string): Promise<AnalyticsByAliasData> {
        const cacheKey = `analytics:alias:${alias}`;

        try {
            // Check if data is cached
            const cachedData = await getCache(cacheKey);
            if (cachedData) {
                return cachedData;
            }

            const response = await this._analyticsRepository.getAnalyticsByAlias(alias);

            // Store in cache for 10 minutes
            await setCache(cacheKey, response, 10 * 60);

            return response as AnalyticsByAliasData;
        } catch (serviceErr) {
            throw new Error(`[Service][getAnalyticsByAlias] alias find failed due to ${serviceErr}`);
        }
    }

    async getAnalyticsbyTopic(topic: string): Promise<AnalyticsByTopicData> {
        const cacheKey = `analytics:topic:${topic}`;

        try {
            // Check if data is cached
            const cachedData = await getCache(cacheKey);
            if (cachedData) {
                return cachedData;
            }

            const urls = await this._analyticsRepository.getUrlsByTopic(topic);
            if (!urls.length) {
                throw new Error("No URLs found for this topic");
            }

            const urlAliases = urls.map((url: { alias: any }) => url.alias);
            const analyticsData = await this._analyticsRepository.getAnalyticsByTopic(urlAliases);

            let totalClicks = 0;
            let uniqueUsers = new Set<string>();
            let clicksByDateMap: Record<string, number> = {};

            const urlAnalyticsMap: Record<string, { totalClicks: number; uniqueUsers: Set<string> }> = {};

            analyticsData.forEach((analytics: { totalClicks: number; userId: { toString: () => string; }; clicksByDate: any[]; alias: string | number; }) => {
                totalClicks += analytics.totalClicks;
                if (analytics.userId) uniqueUsers.add(analytics.userId.toString());

                analytics.clicksByDate.forEach((click) => {
                    clicksByDateMap[click.date] = (clicksByDateMap[click.date] || 0) + click.count;
                });

                if (!urlAnalyticsMap[analytics.alias]) {
                    urlAnalyticsMap[analytics.alias] = { totalClicks: 0, uniqueUsers: new Set() };
                }
                urlAnalyticsMap[analytics.alias].totalClicks += analytics.totalClicks;
                if (analytics.userId) urlAnalyticsMap[analytics.alias].uniqueUsers.add(analytics.userId.toString());
            });

            const clicksByDate = Object.entries(clicksByDateMap).map(([date, count]) => ({ date, count }));

            const urlsResponse = urls.map((url: { shortUrl: any; alias: string | number; }) => ({
                shortUrl: url.shortUrl,
                totalClicks: urlAnalyticsMap[url.alias]?.totalClicks || 0,
                uniqueUsers: urlAnalyticsMap[url.alias]?.uniqueUsers.size || 0,
            }));

            const response = { totalClicks, uniqueUsers: uniqueUsers.size, clicksByDate, urls: urlsResponse };

            // Cache the response for 10 minutes
            await setCache(cacheKey, response, 10 * 60);

            return response;
        } catch (serviceErr) {
            throw new Error(`[Service][getAnalyticsByTopic] topic find failed due to ${serviceErr}`);
        }
    }

    async getOverallAnalytics(userId: string): Promise<AnalyticsByAliasData> {
        const cacheKey = `analytics:overall:${userId}`;

        try {
            // Check if data is cached
            const cachedData = await getCache(cacheKey);
            if (cachedData) {
                return cachedData;
            }

            const response = await this._analyticsRepository.getOverallAnalytics(userId);

            // Store in cache for 10 minutes
            await setCache(cacheKey, response, 10 * 60);

            return response as AnalyticsByAliasData;
        } catch (serviceErr) {
            throw new Error(`[Service][getOverallAnalytics] alias find failed due to ${serviceErr}`);
        }
    }
}
