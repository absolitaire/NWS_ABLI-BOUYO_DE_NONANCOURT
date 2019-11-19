import { IsEmail, IsInstance, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';


export class UpdateUserDto {
  @ApiModelProperty({ description: 'Login', example: 'laughingman' })
  @IsOptional()
  @IsString()
  login: string;

  @ApiModelProperty({ description: 'Password', example: 'thebestpw' })
  @IsOptional()
  @IsString()
  password: string;

  @ApiModelProperty({ description: 'Email', example: 'Mclaughlin.Cochran@undefined.com' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiModelProperty({ description: 'Firstname', example: 'Mclaughlin' })
  @IsOptional()
  @IsString()
  firstname: string;

  @ApiModelProperty({ description: 'Lastname', example: 'Cochran' })
  @IsOptional()
  @IsString()
  lastname: string;

  @ApiModelProperty({ description: 'Address' })
  @IsOptional()
  @IsInstance(AddressDto)
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiModelProperty({ description: 'Phone', example: '+33600000000', pattern: '/^(\+\d{11})$/' })
  @IsOptional()
  @IsPhoneNumber('FR')
  phone: string;

  @ApiModelProperty({ description: 'Url of the profile picture', example: 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg' })
  @IsOptional()
  @IsUrl()
  picture: string;
}
