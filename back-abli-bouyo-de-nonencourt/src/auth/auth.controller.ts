
import { Controller, Post, UseGuards, Logger, UnauthorizedException, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HandlerParams } from './validator/handler-params';

@Controller('auth')
export class AuthController {

  constructor(private readonly _authService: AuthService, private readonly _logger: Logger) {}

  @Post('login')
  async login(@Body() body: HandlerParams) {
    const user = await this._authService.validateUser(body.login, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
