import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user-entity.js";
import { Software } from "./entity/software-entity.js";
import { Request } from "./entity/request-entity.js";
import dotenv from "dotenv";

dotenv.config();

// Helper to ensure required env variables are set
function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: getEnvVariable("DATABASE_HOST"),
  port: parseInt(getEnvVariable("DATABASE_PORT")),
  username: getEnvVariable("DATABASE_USERNAME"),
  password: getEnvVariable("DATABASE_PASSWORD"),
  database: getEnvVariable("DATABASE_NAME"),
  synchronize: true, // Note: Set this to false in production
  logging: true,
  entities: [User, Software, Request],
  subscribers: [],
  migrations: [],
});