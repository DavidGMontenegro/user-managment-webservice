import {BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Students_Teachers_Relation extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    id_student: string;

    @Column({nullable: true})
    id_teacher: string;

    @Column({nullable: false})
    id_subject: string;
}