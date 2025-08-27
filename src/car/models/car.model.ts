import { BelongsTo, Column, DataType,ForeignKey,Model, Table } from "sequelize-typescript"
import { User } from "src/user/models/user.model"

interface ICar{
    id?:number
    name:string
    year?:number
    user_id:number
}

@Table({ tableName: 'car'})
export class Car extends Model<ICar> {
    @Column({
        type: DataType.STRING,
        allowNull:true
    })
    name: string

    @Column({
        type:DataType.STRING,
        allowNull:true
    })
    year: number
    @ForeignKey(()=> User)
    @Column({
        type:DataType.INTEGER,
        allowNull:true
    })
    user_id:number
    
    @BelongsTo(() => User)
    user: User;
}
