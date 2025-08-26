import { Column,DataType,Model,Table} from 'sequelize-typescript';

interface IUser{
  id?:string;
  full_name:string;
  email:string;
  image_url?:string
}

@Table({ tableName: 'users' })
export class User extends Model<IUser> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  image_url: string;
}
