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
    unique: true,
  })
  color!: string;
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  tail_length!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  weight!: number;
}
