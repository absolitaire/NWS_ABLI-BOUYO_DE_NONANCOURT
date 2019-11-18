import { IsEmail, IsInstance, IsNotEmpty, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';

export class CreateUserDto {
  @ApiModelProperty({ description: 'Login', example: 'laughingman' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiModelProperty({ description: 'Password', example: 'thebestpw' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiModelProperty({ description: 'Email', example: 'Mclaughlin.Cochran@undefined.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiModelProperty({ description: 'Firstname', example: 'Mclaughlin' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiModelProperty({ description: 'Lastname', example: 'Cochran' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiModelProperty({ description: 'Address' })
  @IsInstance(AddressDto)
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiModelProperty({ description: 'Phone', example: '+33600000000', pattern: '/^(\+\d{11})$/' })
  @IsPhoneNumber('FR')
  phone: string;
}
