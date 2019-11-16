import { PersonAddressDto } from './person-address.dto';
import { IsBoolean, IsEmail, IsInstance, IsMongoId, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiModelProperty({ description: 'Firstname', example: 'Mclaughlin' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiModelProperty({ description: 'Lastname', example: 'Cochran' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiModelProperty({ description: 'Entity where person works', example: 'UTARA' })
  @IsString()
  @IsNotEmpty()
  entity: string;

  @ApiModelProperty({ description: 'Email', example: 'Mclaughlin.Cochran@undefined.com' })
  @IsEmail()
  email: string;

  @ApiModelProperty({ description: 'Phone', example: '+33600000000', pattern: '/^(\+\d{11})$/' })
  @IsPhoneNumber('FR')
  phone: string;

  @ApiModelProperty({ description: 'Address' })
  @IsInstance(PersonAddressDto)
  @ValidateNested()
  @Type(() => PersonAddressDto)
  address: PersonAddressDto;

  @ApiModelProperty({ description: 'Flag to know if this person is a manager', example: false })
  @IsBoolean()
  isManager: boolean;

  @ApiModelPropertyOptional({description: 'Name of the manager', example: 'Mclaughlin'})
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  manager?: string;

  @ApiModelPropertyOptional({description: 'Unique identifier of the manager', example: '5763cd4dc378a38ecd387737'})
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  managerId?: string;
}
