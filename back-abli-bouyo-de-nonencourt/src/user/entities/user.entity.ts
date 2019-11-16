import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

@Exclude()
export class UserEntity {
  @ApiModelProperty({ description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' })
  @Expose()
  @Type(() => String)
  id: string;

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

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
