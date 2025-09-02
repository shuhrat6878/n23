import { Gurux } from "src/gurux/entities/gurux.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('student')
export class Student {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar'})
    fullname:string;

    @Column({type:'int'})
    age:number;

    @ManyToOne(()=>Gurux,(gurux)=>gurux.student,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    guruxId:Gurux
}
