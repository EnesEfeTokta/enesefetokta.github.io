import express, { Request, Response } from "express";
import cors from "cors";
import apiRoutes from "./routes/api";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:3000", // Allow Next.js frontend requests
  credentials: true
}));
app.use(express.json());

// API Routes
app.use("/api", apiRoutes);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});
