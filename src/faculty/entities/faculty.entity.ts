import { Gurux } from "src/gurux/entities/gurux.entity";
import { Unversity } from "src/university/entities/university.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('faculty')
export class Faculty {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar', unique:true})
    name:string

    @CreateDateColumn()
        createAt:Date;
    
        @UpdateDateColumn()
        UpdateAt:Date;

    @ManyToOne(()=>Unversity,(unversity)=>unversity.faculty,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    unversityId:Unversity;

    @OneToMany(()=>Gurux, (guruh)=>guruh.facultyId)
    guruh:Gurux[];
}
