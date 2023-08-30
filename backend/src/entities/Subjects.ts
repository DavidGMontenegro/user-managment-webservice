import {BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subjects extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    subject_name: string;
}