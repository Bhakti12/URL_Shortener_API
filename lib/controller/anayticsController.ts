import { inject, injectable } from "inversify";
import { IAnalyticsService } from "../interfaces/IAnalyticsService";
import { types } from "../config/types";
import { Request, Response } from "express";
import { sendResponseGet } from "../error/globalSuccessHandler";
import { checking } from "../error/globalErrorHandler";

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
            await sendResponseGet(200, data, res);
        } catch (serviceErr) {
            await checking(serviceErr, req, res);
        }
    }

    async getAnalyticsByTopic(req: Request, res: Response) {
        try {
            const data = await this._analticsService.getAnalyticsbyTopic(req.params.topic);
            await sendResponseGet(200, data, res);
        } catch (serviceErr) {
            await checking(serviceErr, req, res);
        }
    }

    async getOverallAnalytics(req: Request, res: Response) {
        try {
            const data = await this._analticsService.getOverallAnalytics(""); // TODO : pass req.user.id
            await sendResponseGet(200, data, res);
        } catch (serviceErr) {
            await checking(serviceErr, req, res);
        }
    }
}