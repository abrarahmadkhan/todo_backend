import * as classValidator from 'class-validator';
import { PositionEnum } from 'src/shared/employee.position.enum';

export class EmployeeDto {
  @classValidator.IsString()
  @classValidator.IsNotEmpty({ message: 'Name plz' })
  public employee_name: string;

  @classValidator.IsNotEmpty({ message: 'ADMIN or EMPLOYEE' })
  public position: PositionEnum;

  @classValidator.IsString()
  public phone: string;

  @classValidator.IsString()
  @classValidator.IsOptional()
  public username: string;

  @classValidator.IsString()
  @classValidator.IsOptional()
  public password: string;

  @classValidator.IsString()
  @classValidator.IsOptional()
  public access_token: string;
}
