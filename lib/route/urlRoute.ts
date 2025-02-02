import express from 'express';
import rateLimit from 'express-rate-limit';
import urlController from '../controller/urlController';
import { iocContainer as Container } from "../config/container";
import { IUrlService } from '../interfaces/IUrlService';
import { types } from '../config/types';

const urlRouter = express.Router();

const urlService = Container.get<IUrlService>(types.IUrlService);
const urlcController = new urlController(urlService);

// Rate limiter: Limit requests to 5 per minute per user
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,
    message: 'Too many requests, please try again later.'
});

// POST /api/shorten
urlRouter.post('/api/shorten', limiter, (req, res) => urlcController.createShortUrl(req, res));
urlRouter.get('/api/shorten/:alias', (req, res) => urlcController.redirectOrginalUrl(req, res));

export default urlRouter;
