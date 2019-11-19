import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly _logger: Logger, private readonly jwtService: JwtService) {  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByLogin(username).toPromise();
    const pwd = user['0'].password;
    if (user && pwd === password) {
      const { password, ...result } = user;
      return result['0'];
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
