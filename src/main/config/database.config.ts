import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
    migrations: ["src/app/shared/database/migrations/**/*.ts"],
    entities: ["src/app/shared/database/entities/**/*.ts"],
    schema: "vagas",
});