import { Router } from "express";
import { getAllProjects, getProjectById } from "../controllers/projectController";

const router = Router();

// /api/projects
router.get("/projects", getAllProjects);

// /api/projects/:id
router.get("/projects/:id", getProjectById);

export default router;
