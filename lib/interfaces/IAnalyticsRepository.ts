import { AnalyticsByAliasData, AnalyticsByTopicData } from "../types/urlTypes";

export interface IAnalyticsRepository {
    getAnalyticsByAlias(alias: string): Promise<AnalyticsByAliasData>;
    getAnalyticsByTopic(alias: string[]): Promise<any>;
    getOverallAnalytics(userId: string): Promise<AnalyticsByAliasData>;
    getUrlsByTopic(topic: string): Promise<any>;
}