import { inject, injectable } from "inversify";
import { IAnalyticsService } from "../interfaces/IAnalyticsService";
import { AnalyticsByAliasData, AnalyticsByTopicData } from "../types/urlTypes";
import { IAnalyticsRepository } from "../interfaces/IAnalyticsRepository";
import { types } from "../config/types";

@injectable()
export default class analyticsService implements IAnalyticsService {
    private _analyticsRepository: IAnalyticsRepository;
    constructor(
        @inject(types.IAnalyticsRepository) analyticsRepo: IAnalyticsRepository
    ) {
        this._analyticsRepository = analyticsRepo;
    }
    async getAnalyticsbyAlias(alias: string): Promise<AnalyticsByAliasData> {
        try {
            const response = await this._analyticsRepository.getAnalyticsByAlias(alias);
            return response as AnalyticsByAliasData;
        } catch (serviceErr) {
            throw new Error(`[getAnalyticsByAlias] alias find failed due to ${serviceErr}`);
        }
    }
    async getAnalyticsbyTopic(topic: string): Promise<AnalyticsByTopicData> {
        try {
            const urls = await this._analyticsRepository.getUrlsByTopic(topic);
            if (!urls.length) {
                throw new Error("No URLs found for this topic");
            }

            const urlAliases = urls.map((url: { alias: any; }) => url.alias);

            // 2. Fetch analytics for the found URLs
            const analyticsData = await this._analyticsRepository.getAnalyticsByTopic(urlAliases);

            // 3. Compute total clicks & unique users
            let totalClicks = 0;
            let uniqueUsers = new Set<string>(); // Ensures uniqueness
            let clicksByDateMap: Record<string, number> = {}; // Aggregates clicks by date

            const urlAnalyticsMap: Record<string, { totalClicks: number; uniqueUsers: Set<string> }> = {};

            analyticsData.forEach((analytics: { totalClicks: number; userId: { toString: () => string; }; clicksByDate: any[]; alias: string | number; }) => {
                totalClicks += analytics.totalClicks;
                if (analytics.userId) uniqueUsers.add(analytics.userId.toString());

                // Aggregate clicks by date
                analytics.clicksByDate.forEach(click => {
                    clicksByDateMap[click.date] = (clicksByDateMap[click.date] || 0) + click.count;
                });

                // Aggregate data per URL
                if (!urlAnalyticsMap[analytics.alias]) {
                    urlAnalyticsMap[analytics.alias] = { totalClicks: 0, uniqueUsers: new Set() };
                }
                urlAnalyticsMap[analytics.alias].totalClicks += analytics.totalClicks;
                if (analytics.userId) urlAnalyticsMap[analytics.alias].uniqueUsers.add(analytics.userId.toString());
            });

            // Convert clicksByDateMap to an array
            const clicksByDate = Object.entries(clicksByDateMap).map(([date, count]) => ({ date, count }));

            // Prepare URLs array response
            const urlsResponse = urls.map((url: { shortUrl: any; alias: string | number; }) => ({
                shortUrl: url.shortUrl,
                totalClicks: urlAnalyticsMap[url.alias]?.totalClicks || 0,
                uniqueUsers: urlAnalyticsMap[url.alias]?.uniqueUsers.size || 0
            }));

            return {
                totalClicks,
                uniqueUsers: uniqueUsers.size,
                clicksByDate,
                urls: urlsResponse
            };
        } catch (serviceErr) {
            throw new Error(`[getAnalyticsByTopic] topic find failed due to ${serviceErr}`);
        }
    }
    async getOverallAnalytics(userId: string): Promise<AnalyticsByAliasData> {
        try {
            const response = await this._analyticsRepository.getOverallAnalytics(userId);
            return response as AnalyticsByAliasData;
        } catch (serviceErr) {
            throw new Error(`[getOverAllAnalytics] alias find failed due to ${serviceErr}`);
        }
    }

}