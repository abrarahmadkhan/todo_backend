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
} from '@nestjs/common';
import { NodeMail } from 'src/NodeMailer/NodeMailer';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './EmployeeDto/employee.dto';
// import * as nodemailer from 'nodemailer';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  // @UseGuards(AdminGuard)
  @HttpCode(200)
  async getAll(): Promise<Employee[]> {
    return await this.employeeService.findAll();
  }

  @Post()
  async getAllDataByPageAndRows(
    @Body('page') page,
    @Body('rows') rows,
  ): Promise<any> {
    return await this.employeeService.findAllDataByPageAndRows(page, rows);
  }

  @Get(':id')
  // @UseGuards(EmployeeGuard)
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
  // @UseGuards(EmployeeGuard)
  @HttpCode(200)
  getEmployeeJobList(@Param('id') id) {
    console.log('passed');
    try {
      return this.employeeService.findEmployeeJobList(id);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('job/:id')
  // @UseGuards(EmployeeGuard)
  @HttpCode(200)
  EmployeeJobListByRawAndPage(
    @Param('id') id,
    @Body('rows') rows,
    @Body('page') page,
    @Body('Status') status,
  ) {
    console.log('passed');
    try {
      return this.employeeService.findEmployeeJobListByRawAndPage(
        id,
        rows,
        page,
        status,
      );
    } catch (e) {
      console.log(e);
    }
  }

  @Put()
  // @UseGuards(AdminGuard)
  @HttpCode(201)
  async createEmployee(@Body() newEmployee: EmployeeDto) {
    try {
      const usernameB = await this.employeeService.findEmployeeUsername(
        newEmployee.username,
      );
      if (usernameB !== null) {
        return new NotAcceptableException('User Name already Exist');
      } else {
        NodeMail();
        return this.employeeService.create(newEmployee);
      }
    } catch (e) {
      console.log(e);
    }
  }
  @Post(':id')
  // @UseGuards(EmployeeGuard)
  @HttpCode(200)
  updateEmployee(@Body() employeeToUpdate: EmployeeDto) {
    try {
      return this.employeeService.update(employeeToUpdate);
    } catch (e) {
      console.log(e);
    }
  }
  @Delete(':id')
  // @UseGuards(AdminGuard)
  @HttpCode(200)
  deleteEmployee(@Param('id') id) {
    try {
      return this.employeeService.delete(id);
    } catch (e) {
      console.log(e);
    }
  }
}
