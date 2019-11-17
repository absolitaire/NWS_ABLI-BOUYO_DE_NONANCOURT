import { IsMongoId, IsNotEmpty } from 'class-validator';

export class SubscriptionParams {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsMongoId()
  @IsNotEmpty()
  idUser: string;
}
