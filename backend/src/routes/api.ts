import { Router } from "express";
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from "../controllers/project.controller";
import { createBlogPost, deleteBlogPost, getAllBlogPosts, getBlogPostById, updateBlogPost } from "../controllers/blogpost.controller";

const router = Router();

router.get("/projects", getAllProjects);
router.get("/projects/:id", getProjectById)
router.post("/projects", createProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

router.get("/blogposts", getAllBlogPosts);
router.get("/blogposts/:id", getBlogPostById);
router.post("/blogposts", createBlogPost);
router.put("/blogposts/:id", updateBlogPost);
router.delete("/blogposts/:id", deleteBlogPost);

export default router;
