import { AnalyticsByAliasData, AnalyticsByTopicData } from "../types/urlTypes";

export interface IAnalyticsService {
    getAnalyticsbyAlias(alias: string): Promise<AnalyticsByAliasData>;
    getAnalyticsbyTopic(topic: string): Promise<AnalyticsByTopicData>;
    getOverallAnalytics(userId: string): Promise<AnalyticsByAliasData>;
}