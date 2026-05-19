import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.mjs";
import userRoutes from "./routes/user.route.mjs";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.json({ message: "API is running..." });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
