import { config } from "dotenv";
config();
import cookieParser from "cookie-parser";
import express from "express";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js"
import errorMiddelware from "./middelwares/errorMiddelware.js";

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Test endpoint
app.use("/ping", (req, res) => {
    res.send('/pong');
});

// Routes
app.use("/user", userRoutes);
app.use("/tasks", taskRoutes);

// Catch-all for undefined routes
app.all('*', (req, res) => {
    res.status(404).send("OOPS! 404 Page not found..");
});

// Error Handling Middleware
app.use(errorMiddelware);

export default app;
