import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/Employee/employee.entity';
import { EmployeeModule } from 'src/Employee/employee.module';
import { EmployeeService } from 'src/Employee/employee.service';
import { List } from 'src/Jop_List/List.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmployeeGuard } from './Guards/login_Employee.guard';
@Module({
  imports: [
    EmployeeModule,
    PassportModule,
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '1m' },
    }),
    TypeOrmModule.forFeature([Employee]),
    Employee,
    TypeOrmModule.forFeature([List]),
    List,
    EmployeeService,
  ],
  providers: [AuthService, EmployeeService, EmployeeGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
