import { DataSource } from "typeorm"
import { User } from "./entity/user-entity.ts"
import { Software } from "./entity/software-entity.ts"
import { Request } from "./entity/request-entity.ts"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "amitgupta",
    password: "AmGm#@555",
    database: "leucineDB",
    synchronize: true, // Note: Set this to false in production
    logging: true,
    entities: [User, Software, Request],
    subscribers: [],
    migrations: [],
})