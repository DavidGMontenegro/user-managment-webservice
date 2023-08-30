import { DataSource } from "typeorm";
import { Users } from "./entities/Users";
import { Students_Teachers_Relation } from "./entities/Students_Teachers_Relation";
import { Subjects } from "./entities/Subjects";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'root',
    port: 5432,
    database: 'school_database',
    entities: [Users, Students_Teachers_Relation, Subjects],
    logging: true,
    synchronize: true
})