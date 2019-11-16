import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class PersonAddressDto {
  @ApiModelProperty({ description: 'Street', example: 'Jewel Street' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiModelProperty({ description: 'Postal code', example: '61400' })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiModelProperty({ description: 'City', example: 'Snelling' })
  @IsString()
  @IsNotEmpty()
  city: string;
}
