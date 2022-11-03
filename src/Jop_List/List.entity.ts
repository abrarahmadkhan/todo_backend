import { Employee } from 'src/Employee/employee.entity';
import { listEnum } from 'src/shared/list.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class List {
  @PrimaryGeneratedColumn('increment')
  list_id: number;

  @Column({
    type: 'enum',
    enum: listEnum,
  })
  public Status: listEnum;

  @Column()
  Job_Title: string;

  @Column()
  Description: string;

  @Column({
    name: 'created_at',
    nullable: true,
    type: 'timestamptz',
  })
  created_at: Date | null;

  @Column({
    name: 'updated_at',
    nullable: true,
    type: 'timestamptz',
  })
  updated_at: Date | null;

  @ManyToOne(() => Employee, (employee) => employee.List)
  @JoinColumn([{ name: 'employeeListId', referencedColumnName: 'employee_id' }])
  employee: Employee;
}
