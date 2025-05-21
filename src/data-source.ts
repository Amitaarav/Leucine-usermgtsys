import { DataSource } from "typeorm"
import { User } from "./entity/user-entity.ts"
import { Software } from "./entity/software-entity.ts"
import { Request } from "./entity/request-entity.ts"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [User, Software, Request],
    subscribers: [],
    migrations: [],
})