import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { of } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly _logger: Logger) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByLogin(username);
    user.subscribe((user) => {
      this._logger.log(user);
    });
    return null;
  }
}
