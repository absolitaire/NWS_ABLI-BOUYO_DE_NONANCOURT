import { IsInt, IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FindMessagesDto {
  @ApiModelProperty({ description: 'Unique identifier of the channel', example: '5763cd4dc378a38ecd387737' })
  @IsMongoId()
  @IsNotEmpty()
  idChannel: string;

  @ApiModelProperty({ description: 'Max number of messages to retrieve. -1 to retrieve every message.', example: '50' })
  @IsInt()
  @IsNotEmpty()
  threshold: number;

  @ApiModelProperty({ description: 'Retrieve messages starting with the N-th message', example: '51' })
  @IsInt()
  @IsNotEmpty()
  startingAt: number;
}
