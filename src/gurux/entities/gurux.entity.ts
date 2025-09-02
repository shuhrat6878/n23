import { Faculty } from "src/faculty/entities/faculty.entity";
import { Student } from "src/student/entities/student.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('guruh')
export class Gurux {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar', unique:true})
    name:string;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updateAt:Date;

    @ManyToOne(()=>Faculty,(faculty)=>faculty.guruh,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    facultyId:Faculty;

    @OneToMany(()=>Student, (student)=>student.guruxId)
    student:Student[];
}
