import { Router, type IRouter } from "express";
import healthRouter from "./health";
import weatherRouter from "./weather";
import currencyRouter from "./currency";
import toolsRouter from "./tools";

const router: IRouter = Router();

router.use(healthRouter);
router.use(weatherRouter);
router.use(currencyRouter);
router.use(toolsRouter);

export default router;
