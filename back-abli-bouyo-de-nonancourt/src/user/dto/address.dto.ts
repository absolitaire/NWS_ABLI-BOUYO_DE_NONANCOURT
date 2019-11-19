import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiModelProperty({ description: 'Street', example: 'Jewel Street' })
  @IsOptional()
  @IsString()
  street: string;

  @ApiModelProperty({ description: 'Postal code', example: '61400' })
  @IsOptional()
  @IsString()
  postalCode: string;

  @ApiModelProperty({ description: 'City', example: 'Snelling' })
  @IsOptional()
  @IsString()
  city: string;
}
