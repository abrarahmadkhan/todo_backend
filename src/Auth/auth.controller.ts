import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // @Get('')
  // async getAuthSession(@Session() session: Record<string, any>) {
  //   console.log(session);
  //   console.log(session.id);
  // }

  @Post('login')
  async login(@Body() req): Promise<any> {
    console.log(req);
    const valiDateUser = await this.authService.validateEmployee(
      req.username,
      req.password,
    );
    if (!valiDateUser) {
      return null;
    } else {
      try {
        console.log(`Voy`);
        return this.authService.login(req);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
