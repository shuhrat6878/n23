import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('university')
export class University {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"varchar"})
    name:string;


    @Column({type:"varchar",nullable:true})
    location:string;

    @CreateDateColumn()
    createAt:Date;


    @UpdateDateColumn()
    updagteAt:Date
}
