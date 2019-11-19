import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserDao } from '../user/dao/user.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';

@Module({
  imports: [UserModule, PassportModule, MongooseModule.forFeature([ { name: 'User', schema: UserSchema } ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5m' },
    })],
  providers: [AuthService, UserService,  UserDao, Logger, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
