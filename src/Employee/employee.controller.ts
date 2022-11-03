import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotAcceptableException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EmployeeGuard } from 'src/Auth/Guards/login_Employee.guard';
import { AdminGuard } from 'src/Auth/Guards/test.guard';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './EmployeeDto/employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @UseGuards(AdminGuard)
  @HttpCode(200)
  async getAll(): Promise<Employee[]> {
    return await this.employeeService.findAll();
  }

  @Get(':id')
  @UseGuards(EmployeeGuard)
  @HttpCode(200)
  getEmployee(@Param('id') id) {
    console.log('passed');

    try {
      return this.employeeService.findEmployee(id);
    } catch (e) {
      console.log(e);
    }
  }

  @Get('job/:id')
  @UseGuards(EmployeeGuard)
  @HttpCode(200)
  getEmployeeJobList(@Param('id') id) {
    console.log('passed');

    try {
      return this.employeeService.findEmployeejobList(id);
    } catch (e) {
      console.log(e);
    }
  }

  @Put()
  @UseGuards(AdminGuard)
  @HttpCode(201)
  async createEmployee(@Body() newEmployee: EmployeeDto) {
    try {
      const usernameB = await this.employeeService.findEmployeeUsername(
        newEmployee.username,
      );
      if (usernameB !== null) {
        return new NotAcceptableException('User Name already Exist');
      } else {
        return this.employeeService.create(newEmployee);
      }
    } catch (e) {
      console.log(e);
    }
  }
  @Post(':id')
  @UseGuards(EmployeeGuard)
  @HttpCode(200)
  updateEmployee(@Body() employeeToUpdate: EmployeeDto) {
    try {
      return this.employeeService.update(employeeToUpdate);
    } catch (e) {
      console.log(e);
    }
  }
  @Delete(':id')
  @UseGuards(AdminGuard)
  @HttpCode(200)
  deleteEmployee(@Param('id') id) {
    try {
      return this.employeeService.delete(id);
    } catch (e) {
      console.log(e);
    }
  }
}
