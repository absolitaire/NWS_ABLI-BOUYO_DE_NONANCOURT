import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { AddressEntity } from './address.entity';

@Exclude()
export class UserEntity {
  @ApiModelProperty({ description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' })
  @Expose()
  @Type(() => String)
  _id: string;

  @ApiModelProperty({ description: 'login', example: 'francisdu55' })
  @Expose()
  @Type(() => String)
  login: string;

  @ApiModelProperty({ description: 'Firstname', example: 'Mclaughlin' })
  @Expose()
  @Type(() => String)
  password: string;

  @ApiModelProperty({ description: 'Email', example: 'Mclaughlin.Cochran@undefined.com' })
  @Expose()
  @Type(() => String)
  email: string;

  @ApiModelProperty({ description: 'Firstname', example: 'Mclaughlin' })
  @Expose()
  @Type(() => String)
  firstname: string;

  @ApiModelProperty({ description: 'Lastname', example: 'Cochran' })
  @Expose()
  @Type(() => String)
  lastname: string;

  @ApiModelProperty({ description: 'Address' })  @Expose()
  @Type(() => AddressEntity)
  address: AddressEntity;

  @ApiModelProperty({ description: 'Phone', example: '+33600000000', pattern: '/^(\+\d{11})$/' })
  @Expose()
  @Type(() => String)
  phone: string;
  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
