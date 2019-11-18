import { ApiModelProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class SubscriptionDto {
  @ApiModelProperty({description:'id of a subscribed channel', example: '5763cd4dc378a38ecd387737'})
  @IsOptional()
  @IsMongoId()
  idChannel: string
  @ApiModelProperty({description:'id of a subscribed user', example: '5763cd4dc378a38ecd387737'})
  @IsOptional()
  @IsMongoId()
  idUser: string
}
