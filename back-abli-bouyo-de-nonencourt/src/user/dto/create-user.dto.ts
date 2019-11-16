import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty({ description: 'Firstname', example: 'Mclaughlin' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiModelProperty({ description: 'Lastname', example: 'Cochran' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiModelProperty({ description: 'Email', example: 'Mclaughlin.Cochran@undefined.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
