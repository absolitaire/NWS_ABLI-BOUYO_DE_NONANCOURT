import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateMessageDto {

  @ApiModelProperty({ description: 'Unique identifier of the author', example: '5763cd4dc378a38ecd387737' })
  @IsMongoId()
  @IsNotEmpty()
  idUser: string;

  @ApiModelProperty({ description: 'Description of the channel', example: 'Channel for the fans of Basketball' })
  @IsOptional()
  @IsString()
  content: string;

  @ApiModelProperty({ description: 'Unique identifier of the channel', example: '5763cd4dc378a38ecd387737' })
  @IsMongoId()
  @IsNotEmpty()
  idChannel: string;
}
