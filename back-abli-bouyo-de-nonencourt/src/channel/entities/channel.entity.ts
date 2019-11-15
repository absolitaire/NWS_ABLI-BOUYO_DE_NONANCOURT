import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

@Exclude()
export class ChannelEntity {
  @ApiModelProperty({ description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiModelProperty({ description: 'Unique identifier destined to be seen and used by the users', example: 'AbCd3' })
  @Expose()
  @Type(() => String)
  idChannel: string;

  @ApiModelProperty({ description: 'Name', example: 'The Basketball Channel' })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiModelProperty({ description: 'Description of the channel', example: 'Channel for the fans of Basketball' })
  @Expose()
  @Type(() => String)
  description: string;
  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<ChannelEntity>) {
    Object.assign(this, partial);
  }
}
