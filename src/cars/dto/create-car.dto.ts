import { IsString, MinLength } from 'class-validator';

export class CreateCarDTO {
  @IsString({ message: 'Brand must be a String.' })
  readonly brand: string;
  @IsString({ message: 'Model must be a String.' })
  @MinLength(3, { message: 'Model minimum 3 characters.' })
  readonly model: string;
}
