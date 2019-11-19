import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateChannelDto {

  @ApiModelProperty({ description: 'Unique identifier destined to be seen and used by the users', example: 'AbCd3' })
  @IsOptional()
  @IsString()
  idChannel: string;

  @ApiModelProperty({ description: 'Name', example: 'The Basketball Channel' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty({ description: 'Description of the channel', example: 'Channel for the fans of Basketball' })
  @IsOptional()
  @IsString()
  description: string;
}
