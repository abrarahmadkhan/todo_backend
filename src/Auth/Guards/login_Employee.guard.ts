import { Injectable, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmployeeGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService, // Do not use @Inject (or nest won't be able to inject it)
  ) {}

  /**
   * Rely on status service to check if Hodor thinks it is dangerous at the given date/time.
   * @throws ForbiddenException if Hodor thinks it's dangerous at the given date/time => 403
   */
  async canActivate(context: any): Promise<boolean> {
    const request = await context.switchToHttp().getRequest().rawHeaders;
    const user: any = await this.jwtService.decode(request[1].split(' ')[1]);
    if (user.Position == 'Employee' && user.Position == 'Admin') {
      return true;
    } else {
      return false;
    }
  }
}
