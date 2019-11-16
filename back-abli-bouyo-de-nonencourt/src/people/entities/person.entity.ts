import { Exclude, Expose, Type } from 'class-transformer';
import { PersonAddressEntity } from './person-address.entity';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

@Exclude()
export class PersonEntity {
  @ApiModelProperty({ description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiModelProperty({ description: 'Photo URL', example: 'https://randomuser.me/portraits/men/55.jpg' })
  @Expose()
  @Type(() => String)
  photo: string;

  @ApiModelProperty({ description: 'Firstname', example: 'Mclaughlin' })
  @Expose()
  @Type(() => String)
  firstname: string;

  @ApiModelProperty({ description: 'Lastname', example: 'Cochran' })
  @Expose()
  @Type(() => String)
  lastname: string;

  @ApiModelProperty({ description: 'Entity where person works', example: 'UTARA' })
  @Expose()
  @Type(() => String)
  entity: string;

  @ApiModelProperty({ description: 'Birthdate in timestamp format', example: '101343600000' })
  @Expose()
  @Type(() => Number)
  birthDate: number;

  @ApiModelProperty({ description: 'Email', example: 'Mclaughlin.Cochran@undefined.com' })
  @Expose()
  @Type(() => String)
  email: string;

  @ApiModelProperty({ description: 'Phone', example: '+33600000000', pattern: '/^(\+\d{11})$/' })
  @Expose()
  @Type(() => String)
  phone: string;

  @ApiModelProperty({ description: 'Address' })
  @Expose()
  @Type(() => PersonAddressEntity)
  address: PersonAddressEntity;

  @ApiModelProperty({ description: 'Flag to know if this person is a manager', example: false })
  @Expose()
  @Type(() => Boolean)
  isManager: boolean;

  @ApiModelPropertyOptional({description: 'Name of the manager', example: 'Mclaughlin'})
  @Expose()
  @Type(() => String)
  manager: string;

  @ApiModelPropertyOptional({description: 'Unique identifier of the manager', example: '5763cd4dc378a38ecd387737'})
  @Expose()
  @Type(() => String)
  managerId: string;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<PersonEntity>) {
    Object.assign(this, partial);
  }
}
