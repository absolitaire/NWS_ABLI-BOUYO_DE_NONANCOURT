import { Exclude, Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

@Exclude()
export class AddressEntity {
  @ApiModelProperty({ description: 'Street', example: 'Jewel Street' })
  @Expose()
  street: string;

  @ApiModelProperty({ description: 'Postal code', example: '61400' })
  @Expose()
  postalCode: string;

  @ApiModelProperty({ description: 'City', example: 'Snelling' })
  @Expose()
  city: string;
}
