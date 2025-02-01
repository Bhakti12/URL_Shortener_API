import { inject, injectable } from "inversify";
import { IUrlService } from "../interfaces/IUrlService";
import { types } from "../config/types";
import { Request, Response } from "express";

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
            const userId = req.body.id;  //TODO: convert into user.id
            const result = await this._urlService.createShortenUrl({ longUrl, customAlias, topic, userId });
            return res.status(201).json(result);
        } catch (serviceErr) {
            return res.status(500).json({ error: 'Internal server error' });
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
            return res.status(404).json({ error: 'Original URL not found' });
        }
    }
}