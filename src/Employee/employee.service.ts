import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
    private jwt: JwtService,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.employeeRepo.find();
  }
  async findAllDataByPageAndRows(
    page: number,
    rows: number,
  ): Promise<any> {
    const Page = page * rows;
    const response = await this.employeeRepo.findAndCount({
      take: rows,
      skip: Page,
    });
    return response;
  }

  async create(newEmployee): Promise<Employee> {
    const employee = new Employee();
    employee.employee_name = newEmployee.employee_name;
    employee.position = newEmployee.position;
    employee.phone = newEmployee.phone;
    employee.username = newEmployee.username;
    const salt = await bcrypt.genSalt(10);
    const userPassword = await bcrypt.hash(newEmployee.password, salt);
    employee.password = userPassword;
    newEmployee.password = userPassword;
    employee.access_token = newEmployee.access_token;
    console.log(employee);
    return this.employeeRepo.save(newEmployee);
  }

  findEmployee(employee_id: number) {
    return this.employeeRepo.findOneBy({ employee_id });
  }

  async findEmployeeJobList(employee_id: number) {
    try {
      const JobList = await this.employeeRepo.find({
        where: { employee_id: employee_id },
        relations: ['List'],
      });
      return JobList;
    } catch (e) {
      console.log(e);
    }
  }

  validateUser(decoded: any): Promise<Employee> {
    return this.employeeRepo.findOne(decoded.id);
  }
  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException(
        'access-token must be passed in header',
        HttpStatus.FORBIDDEN,
      );
    }

    const user: Employee = await this.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }

  update(employeetoUpdate: any) {
    this.employeeRepo.update(employeetoUpdate.employee_id, employeetoUpdate);
  }
  async updateToAccessToken(updateToAccessToken: any) {
    const user = updateToAccessToken.user;
    const newAccessToken = updateToAccessToken.access_token;
    await this.employeeRepo.update(user, { access_token: newAccessToken });
    Promise<Employee>;
  }
  delete(id) {
    this.employeeRepo.delete(id);
  }
  findEmployeeUsername(username: string) {
    return this.employeeRepo.findOneBy({ username });
  }

  findEmployeeAccessToken = async (newRequest: string): Promise<Employee> => {
    const access_token = newRequest;
    console.log(
      '🚀 ~ file: employee.service.ts ~ line 50 ~ EmployeeService ~ findEmployeeAccessToken ~ access_token',
      access_token,
    );
    const result = await this.employeeRepo.findOneBy({ access_token });
    console.log(
      '🚀 ~ file: employee.service.ts ~ line 49 ~ EmployeeService ~ findEmployeeAccessToken ~ access_token',
      result,
    );
    return result;
  };
  // Get User by User ID we get from decode()
}
