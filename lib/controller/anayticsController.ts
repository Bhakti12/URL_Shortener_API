import { inject, injectable } from "inversify";
import { IAnalyticsService } from "../interfaces/IAnalyticsService";
import { types } from "../config/types";
import { Request, Response } from "express";

@injectable()
export default class AnalyticalController {
    private _analticsService: IAnalyticsService;

    constructor(
        @inject(types.IAnalyticsService) analyticsService: IAnalyticsService) {
        this._analticsService = analyticsService;
    }

    async getAnalyticsByAlias(req: Request, res: Response) {
        try {
            const data = await this._analticsService.getAnalyticsbyAlias(req.params.alias);
            res.json(data);
        } catch (serviceErr) {
            res.status(404).json({ error: serviceErr });
        }
    }

    async getAnalyticsByTopic(req: Request, res: Response) {
        try {
            const data = await this._analticsService.getAnalyticsbyTopic(req.params.topic);
            res.json(data);
        } catch (serviceErr) {
            res.status(404).json({ error: serviceErr});
        }
    }

    async getOverallAnalytics(req: Request, res: Response) {
        try {
            const data = await this._analticsService.getOverallAnalytics(""); // TODO : pass req.user.id
            res.json(data);
        } catch (serviceErr) {
            res.status(404).json({ error: serviceErr});
        }
    }
}