import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import apiRoutes from "./routes/api";
import cron from "node-cron";
import { syncGitHubData } from "./services/github.service";
import prisma from "./db/prisma";

const app = express();
const PORT = process.env.PORT || 5000;

cron.schedule("0 0 * * *", async () => {
  console.log("Running daily GitHub sync task...");
  try {
    await syncGitHubData();
    console.log("GitHub data sync completed successfully.");
  } catch (error) {
    console.error("Error during GitHub data sync:", error);
  }
});

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.listen(PORT, async () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);

  try {
    const existingData = await prisma.gitHubSnapshot.findFirst();
    
    if (!existingData) {
      console.log("No existing data found, syncing for the first time...");
      await syncGitHubData();
    } else {
      console.log("Database already has GitHub data. Skipping initial sync.");
    }
  } catch (error) {
    console.error("Initial check/sync failed:", error);
  }
});
