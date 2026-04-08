import { Router } from "express";
import { 
    createProject, 
    deleteProject, 
    getAllProjects, 
    getProjectById, 
    updateProject 
} from "../controllers/project.controller";
import { 
    createBlogPost, 
    deleteBlogPost, 
    getAllBlogPosts, 
    getBlogPostById, 
    updateBlogPost 
} from "../controllers/blogpost.controller";
import { 
    createExperience, 
    deleteExperience, 
    getAllExperiences, 
    getExperienceById, 
    updateExperience 
} from "../controllers/experience.controller";
import {
	createPersonalDevelopment,
	deletePersonalDevelopment,
	getAllPersonalDevelopments,
	getPersonalDevelopmentById,
	updatePersonalDevelopment,
} from "../controllers/personaldevelopment.controller";
import {
	createCertification,
	deleteCertification,
	getAllCertifications,
	getCertificationById,
	updateCertification,
} from "../controllers/certification.controller";
import { 
    createUser, 
    deleteUser, 
    getAllUsers, 
    getUserById, 
    updateUser 
} from "../controllers/user.controller";
import { 
    createStatistics, 
    getAllStatistics, 
    getStatisticsById, 
    updateStatistics ,
    getStatisticsGitHubLatest
} from "../controllers/statistics.controller";

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

router.get("/experiences", getAllExperiences);
router.get("/experiences/:id", getExperienceById);
router.post("/experiences", createExperience);
router.put("/experiences/:id", updateExperience);
router.delete("/experiences/:id", deleteExperience);

router.get("/personaldevelopments", getAllPersonalDevelopments);
router.get("/personaldevelopments/:id", getPersonalDevelopmentById);
router.post("/personaldevelopments", createPersonalDevelopment);
router.put("/personaldevelopments/:id", updatePersonalDevelopment);
router.delete("/personaldevelopments/:id", deletePersonalDevelopment);

router.get("/certifications", getAllCertifications);
router.get("/certifications/:id", getCertificationById);
router.post("/certifications", createCertification);
router.put("/certifications/:id", updateCertification);
router.delete("/certifications/:id", deleteCertification);

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/statistics", getAllStatistics);
router.get("/statistics/:id", getStatisticsById);
router.post("/statistics", createStatistics);
router.put("/statistics/:id", updateStatistics);
router.get("/statistics/github-latest", getStatisticsGitHubLatest);

export default router;
