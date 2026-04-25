import { Router } from "express";
import { 
    createStatistics, 
    getAllStatistics, 
    getStatisticsById, 
    updateStatistics ,
    getStatisticsGitHubLatest
} from "../controllers/statistics.controller";

const router = Router();

router.get("/statistics/github-latest", getStatisticsGitHubLatest);

router.get("/statistics", getAllStatistics);
router.post("/statistics", createStatistics);
router.put("/statistics/:id", updateStatistics);

router.get("/statistics/:id", getStatisticsById);

export default router;
