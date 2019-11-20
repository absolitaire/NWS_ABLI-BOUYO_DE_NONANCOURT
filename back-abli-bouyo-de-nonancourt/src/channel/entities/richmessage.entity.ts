import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';

@Exclude()
export class RichMessageEntity {

  @ApiModelProperty({ description: 'Content', example: 'This is a funny message.' })
  @Expose()
  @Type(() => String)
  content: string;

  @ApiModelProperty({ description: 'Date of the message', example: '101343600000' })
  @Expose()
  @Type(() => Number)
  date: number;

  @ApiModelProperty({ description: 'Login of author', example: 'francis' })
  @Expose()
  @Type(() => String)
  login: String;

  @ApiModelProperty({ description: 'Picture of user', example: 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg' })
  @Expose()
  @Type(() => String)
  picture: String;
  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<RichMessageEntity>) {
    Object.assign(this, partial);
  }

  fillData(content: string, date: number, login: string, picture: string){
    this.content = content;
    this.date = date;
    this.login = login;
    this.picture = picture;
  }
}
