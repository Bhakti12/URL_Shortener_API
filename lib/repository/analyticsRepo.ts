import { injectable } from "inversify";
import { IAnalyticsRepository } from "../interfaces/IAnalyticsRepository";
import { AnalyticsByAliasData, AnalyticsByTopicData } from "../types/urlTypes";
import analyticsSchema from "../models/analyticsSchema";
import { ClicksByDate, OsType } from "../types/urlTypes";
import urlSchema from "../models/urlSchema";

@injectable()
export default class analyticsRepository implements IAnalyticsRepository {
    async getUrlsByTopic(topic: string): Promise<any> {
        try {
            const urls = await urlSchema.find({ topic });
            return urls;
        } catch (serviceErr) {
            throw new Error(`[getUrlsByTopic] topic find failed due to ${serviceErr}`);
        }
    }
    async getAnalyticsByAlias(alias: string): Promise<AnalyticsByAliasData> {
        try {
            const data = await analyticsSchema.findOne({ alias: alias });
            return data as AnalyticsByAliasData;
        } catch (serviceErr) {
            throw new Error(`[getAnalyticsByAlias] alias find failed due to ${serviceErr}`);
        }
    }
    async getAnalyticsByTopic(alias: string[]): Promise<any> {
        try {
            const data = await analyticsSchema.find({ alias: { $in: alias } });
            return data;
        } catch (serviceErr) {
            throw new Error(`[getAnalyticsByTopic] topic find failed due to ${serviceErr}`);
        }
    }
    async getOverallAnalytics(userId: string): Promise<AnalyticsByAliasData> {
        try {
            const data = await analyticsSchema.findOne({ userId: userId });
            const res = { totalClicks: data?.totalClicks, uniqueUsers: data?.uniqueUsers, clicksByDate: data?.clicksByDate, osType: data?.osType, deviceType: data?.deviceType };
            return res as AnalyticsByAliasData;
        } catch (serviceErr) {
            throw new Error(`[getAnalyticsByAlias] alias find failed due to ${serviceErr}`);
        }
    }
}