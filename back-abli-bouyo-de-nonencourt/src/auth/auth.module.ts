import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserDao } from '../user/dao/user.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [UserModule, PassportModule, MongooseModule.forFeature([ { name: 'User', schema: UserSchema } ])],
  providers: [AuthService, UserService,  UserDao, Logger],
  controllers: [AuthController],
})
export class AuthModule {}
