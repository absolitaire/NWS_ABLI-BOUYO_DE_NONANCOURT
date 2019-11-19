import { IsInt, IsMongoId, IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FindMessagesQuery {
  @IsMongoId()
  @IsNotEmpty()
  idChannel: string;

  @IsNumberString()
  @IsNotEmpty()
  threshold: number;

  @IsNumberString()
  @IsNotEmpty()
  startingAt: number;
}
