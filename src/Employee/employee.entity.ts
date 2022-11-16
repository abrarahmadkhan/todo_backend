import { Exclude } from 'class-transformer';
import { List } from 'src/Jop_List/List.entity';
import { PositionEnum } from 'src/shared/employee.position.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('increment')
  employee_id: number;

  @Column()
  employee_name: string;

  @Column({
    type: 'enum',
    enum: PositionEnum,
  })
  public position: PositionEnum;

  @Column()
  phone: string;

  @Column()
  username: string;

  @Exclude()
  @Column({ type: 'varchar', name: 'password', nullable: true })
  public password!: string;

  @Column({
    type: 'boolean',
    name: 'isActive',
    nullable: true,
    default: false,
  })
  public isActive!: boolean | null;

  @Column()
  access_token: string;

  @OneToMany(() => List, (List) => List.employee)
  List: List[];
}
