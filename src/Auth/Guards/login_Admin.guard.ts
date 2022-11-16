// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// //import { Reflector } from '@nestjs/core';
// // import { EmployeeService } from 'src/Employee/employee.service';

// Injectable();

// export class loginAdminGuard implements CanActivate {
//   constructor(private readonly jwt: JwtService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     try {
//       // constructor(jwt: JwtService) {
//       // this.jwt = jwt;
//       const request = await context.switchToHttp().getRequest().rawHeaders;
//       console.log(
//         '🚀 ~ file: login_Admin.guard.ts ~ line 19 ~ loginAdminGuard ~ //constructor ~ request',
//         request,
//       );
//       const access_token = request[1].split(' ')[1];
//       console.log(
//         '🚀 ~ file: login_Employee.guard.ts ~ line 15 ~ loginEmployee ~ canActivate ~ request',
//         access_token,
//       );
//       const user = await this.jwt.decode(access_token);
//       console.log(
//         '🚀 ~ file: login_Employee.guard.ts ~ line 20 ~ loginEmployee ~ canActivate ~ user',
//         user,
//       );
//       // const Position = user;
//       // if (Position == 'Admin') {
//       //   return true;
//       // } else {
//       return false;
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }
