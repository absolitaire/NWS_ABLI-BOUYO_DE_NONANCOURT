import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';
import { min } from 'rxjs/operators';

export class IdChannelParams {
  @IsString()
  @Length(5, 5)
  @IsNotEmpty()
  idChannel: string;
}
