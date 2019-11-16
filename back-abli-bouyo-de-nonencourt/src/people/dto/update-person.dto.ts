import { PersonAddressDto } from './person-address.dto';
import { IsBoolean, IsEmail, IsInstance, IsMongoId, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdatePersonDto {
  @ApiModelPropertyOptional({ description: 'Firstname', example: 'Mclaughlin' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstname?: string;

  @ApiModelPropertyOptional({ description: 'Lastname', example: 'Cochran' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastname?: string;

  @ApiModelPropertyOptional({ description: 'Entity where person works', example: 'UTARA' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  entity?: string;

  @ApiModelPropertyOptional({ description: 'Email', example: 'Mclaughlin.Cochran@undefined.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiModelPropertyOptional({ description: 'Phone', example: '+33600000000', pattern: '/^(\+\d{11})$/' })
  @IsOptional()
  @IsPhoneNumber('FR')
  phone?: string;

  @ApiModelPropertyOptional({ description: 'Address' })
  @IsOptional()
  @IsInstance(PersonAddressDto)
  @ValidateNested()
  @Type(() => PersonAddressDto)
  address?: PersonAddressDto;

  @ApiModelPropertyOptional({ description: 'Flag to know if this person is a manager', example: false })
  @IsOptional()
  @IsBoolean()
  isManager?: boolean;

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
