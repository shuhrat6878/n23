import { Faculty } from "src/faculty/entities/faculty.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('unversity')
export class Unversity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar',unique:true})
    name:string;

    @Column({type:'varchar',nullable:true})
    location:string;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    UpdateAt:Date;

    @OneToMany(()=>Faculty,(faculty)=>faculty.unversityId)
    faculty:Faculty[];
}