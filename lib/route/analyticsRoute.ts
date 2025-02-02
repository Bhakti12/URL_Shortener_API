import express, { Router } from "express";
import AnalyticalController from "../controller/anayticsController";
import { iocContainer as Container } from "../config/container";
import { IAnalyticsService } from "../interfaces/IAnalyticsService";
import { types } from "../config/types";

const analyticsRouter = express.Router();

const analyticsService = Container.get<IAnalyticsService>(types.IAnalyticsService);
const analyticscController = new AnalyticalController(analyticsService);

analyticsRouter.get("/analytics/:alias", (req, res)=> analyticscController.getAnalyticsByAlias(req, res));
analyticsRouter.get("/analytics/topic/:topic", (req, res)=>analyticscController.getAnalyticsByTopic(req, res));
analyticsRouter.get("/analytics/overall", (req, res)=>analyticscController.getOverallAnalytics(req, res));

export default analyticsRouter;