import express from "express";
import helmet from "helmet";
import cors from "cors";
import 'reflect-metadata'
import { serverConfig, logger } from "./config/index.js";
import apiRoutes from "./routes/index.js";
import { AppDataSource } from "./data-source.js";

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});


async function startServer() {
  try {
    console.log("Initializing database...");
    await AppDataSource.initialize();
    console.log("DB initialized");
    logger.info("Database initialized successfully");

    const app = express();

    app.use(helmet());
    app.use(express.json());
    app.use(
      cors({
        origin: ["https://yourfrontend.com"],
        credentials: true,
      })
    );

    app.use("/api", apiRoutes);

    app.get("/", (_req, res) => {
      res.send("Server is up and running 🚀");
    });

    app.listen(serverConfig.PORT, () => {
      logger.info(`Server listening on port ${serverConfig.PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    logger.error("Failed to start server", { error: err });
    process.exit(1);
  }
}

startServer();
