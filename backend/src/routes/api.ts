import { Router } from "express";
import { 
    createStatistics, 
    getAllStatistics, 
    getStatisticsById, 
    updateStatistics ,
    getStatisticsGitHubLatest
} from "../controllers/statistics.controller";

const router = Router();

router.get("/statistics", getAllStatistics);
router.get("/statistics/:id", getStatisticsById);
router.post("/statistics", createStatistics);
router.put("/statistics/:id", updateStatistics);
router.get("/statistics/github-latest", getStatisticsGitHubLatest);

export default router;
