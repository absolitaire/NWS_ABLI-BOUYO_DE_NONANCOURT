import { Controller, Post, UseGuards, Logger, UnauthorizedException, Param, Body, Get , Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { HandlerParams } from './validator/handler-params';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  constructor(private readonly _authService: AuthService, private readonly _logger: Logger) {}

  @Post('login')
  async login(@Body() body: HandlerParams) {

    const user = await this._authService.validateUser(body['login'], body['password']);
    if (!user) {
      throw new UnauthorizedException();
    }
    // Authentification
    return this._authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


}
