import { IsEmail, IsInstance, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';


export class LoginUserDto {
    @ApiModelProperty({ description: 'Login', example: 'laughingman' })
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiModelProperty({ description: 'Password', example: 'thebestpw' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
