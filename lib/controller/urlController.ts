import { inject, injectable } from "inversify";
import { IUrlService } from "../interfaces/IUrlService";
import { types } from "../config/types";
import { Request, Response } from "express";
import { sendResponse } from "../error/globalSuccessHandler";
import { sendErrorProd } from "../error/globalErrorHandler";

@injectable()
export default class urlController {
    private _urlService: IUrlService;

    constructor(
        @inject(types.IUrlService) urlService: IUrlService
    ) {
        this._urlService = urlService;
    }

    async createShortUrl(req: Request, res: Response): Promise<any> {
        try {
            const { longUrl, customAlias, topic } = req.body;
            const userId = (req.user as any)._id;
            console.log('request body and request user', req.body, req.user);
            const result = await this._urlService.createShortenUrl({ longUrl, customAlias, topic, userId });
            await sendResponse(200, 'Short Url Successfully Created', result, res);
        } catch (serviceErr) {
            await sendErrorProd(serviceErr, req, res);
        }
    }

    async redirectOrginalUrl(req: Request, res: Response): Promise<any> {
        try {
            const { alias } = req.params;
            const userAgent = req.headers['user-agent'];
            const ipAddress = req.ip;

            const originalUrl = await this._urlService.handleRedirect({ alias: alias, userAgent: userAgent, ipAddress: ipAddress });

            return res.redirect(301, originalUrl);
        } catch (serviceErr) {
            await sendErrorProd(serviceErr, req, res);
        }
    }
}