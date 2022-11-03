import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Employee } from 'src/Employee/employee.entity';
import { EmployeeService } from 'src/Employee/employee.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private employeeService: EmployeeService,
  ) {}
  async validateEmployee(username: string, pass: string): Promise<Employee> {
    const user = await this.employeeService.findEmployeeUsername(username);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(pass, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    } else if (user && passwordValid) {
      return user;
    } else {
      return null;
    }
  }
  async login(req: { userName: string; password: string }): Promise<any> {
    const userData = await this.employeeService.findEmployeeUsername(
      req.userName,
    );
    const payload = {
      username: userData.username,
      userId: userData.employee_id,
      Position: userData.position,
    };
    const access_token = await this.jwtService.sign(payload, {
      privateKey: 'UCWMakQmFszIUmKa1LnOFHrTqqJu6Bcp',
    });
    // console.log(
    //   '🚀 ~ file: auth.service.ts ~ line 38 ~ AuthService ~ login ~ access_token',
    //   access_token,
    // );
    // const testDecoder = await this.jwtService.decode(access_token, null);
    // console.log(
    //   '🚀 ~ file: auth.service.ts ~ line 43 ~ AuthService ~ login ~ testDecoder',
    //   testDecoder,
    // );
    await this.employeeService.updateToAccessToken({
      id: userData.employee_id,
      access_token: access_token,
    });
    return { access_token };
  }
  public async decode(token: string): Promise<unknown> {
    return this.jwtService.decode(token, null);
  }
}
