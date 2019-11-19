import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';

@Exclude()
export class MessageEntity {
  @ApiModelProperty({ description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' })
  @Expose()
  @Type(() => String)
  _id: string;

  @ApiModelProperty({ description: 'Content', example: 'This is a funny message.' })
  @Expose()
  @Type(() => String)
  content: string;


  @ApiModelProperty({ description: 'Id of author', example: '5763cd4dc378a38ecd387737' })
  @Expose()
  @Type(() => String)
  idUser: String;

  @ApiModelProperty({ description: 'Date of the message', example: '101343600000' })
  @Expose()
  @Type(() => Number)
  date: number;
  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<MessageEntity>) {
    Object.assign(this, partial);
  }

  fillData(id: string, content: string, idUser: string, date: number){
    this._id = id;
    this.content = content;
    this.idUser = idUser;
    this.date = date;
  }
}
