import { Table ,Model, Column, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import { User } from "src/user/models/user.model";

interface IShahar{
    id?:number
    name:string
    user_id:number
}

@Table({tableName:"shahar"})
export class Shahar extends Model<IShahar> {
    @Column({
       type: DataType.STRING,
       allowNull: false
    })
    name:string;
    @ForeignKey(()=> User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id:number;

    @BelongsTo(()=> User)
    user:User;
}
