import { Router, type IRouter } from "express";
import healthRouter from "./health";
import weatherRouter from "./weather";
import currencyRouter from "./currency";
import toolsRouter from "./tools";
import imageToolsRouter from "./image-tools";
import blogRouter from "./blog";
import sitemapRouter from "./sitemap";

const router: IRouter = Router();

router.use(healthRouter);
router.use(weatherRouter);
router.use(currencyRouter);
router.use(toolsRouter);
router.use(imageToolsRouter);
router.use(blogRouter);
router.use(sitemapRouter);

export default router;
