import { Controller, Post, UseGuards, Logger, UnauthorizedException, Param, Body, Get , Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { HandlerParams } from './validator/handler-params';
import { AuthGuard } from '@nestjs/passport';
import {ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiImplicitBody, ApiUnprocessableEntityResponse} from '@nestjs/swagger';
import {UserEntity} from '../user/entities/user.entity';
import {LoginUserDto} from './dto/login_user.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly _authService: AuthService, private readonly _logger: Logger) {}

  /**
   * Handler to answer to POST /auth/login route
   *
   *
   * @returns Observable<UserEntity>
   * @param body
   */
  @ApiCreatedResponse({ description: 'The user has been successfully logged in', type: UserEntity })
  @ApiConflictResponse({ description: 'The user does not exist in database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiImplicitBody({ name: 'LoginUserDto', description: 'Payload to create a new user', type: LoginUserDto })
  @Post('login')
  async login(@Body() body) {
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
