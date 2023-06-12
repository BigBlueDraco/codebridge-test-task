import { timeStamp } from "console";
import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "dogs",
})
export class Dogs extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  color!: string;
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  tail_length!: string;
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  weight!: number;
}
