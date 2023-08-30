import {BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Check } from "typeorm";

@Entity()
@Check(`role IN (1, 2)`)  //Asegura que en el campo role solo se pueden insertar valores 1 o 2
export class Users extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    username: string;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    surnames: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    role: number;

    @Column({nullable: true})
    access_token: string;

    @Column({nullable: true})
    password_token: string; 

    @Column({default: false})
    active: boolean;

    @Column("bytea", { nullable: true })
    photo: Buffer | null;
}