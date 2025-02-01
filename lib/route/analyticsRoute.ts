import { Router } from "express";
import AnalyticalController from "../controller/anayticsController";
import { iocContainer as Container } from "../config/container";
import { IAnalyticsService } from "../interfaces/IAnalyticsService";
import { types } from "../config/types";

const router = Router();

const analyticsService = Container.get<IAnalyticsService>(types.IAnalyticsService);
const analyticscController = new AnalyticalController(analyticsService);

router.get("/analytics/:alias", (req, res)=> analyticscController.getAnalyticsByAlias(req, res));
router.get("/analytics/topic/:topic", (req, res)=>analyticscController.getAnalyticsByTopic(req, res));
router.get("/analytics/overall", (req, res)=>analyticscController.getOverallAnalytics(req, res));

export default router;