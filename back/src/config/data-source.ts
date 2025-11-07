import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Appointment } from "../entities/Appointment"
import { Credential } from "../entities/Credential";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./envs";



export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST || "localhost",
    port: DB_PORT || 5432,
    username: DB_USERNAME || "test",
    password: DB_PASSWORD || "test",
    database: DB_NAME || "test",
    synchronize: true,
    dropSchema: false,
    logging: false,
    entities: [User, Credential, Appointment],
    subscribers: [],
    migrations: [],
});
