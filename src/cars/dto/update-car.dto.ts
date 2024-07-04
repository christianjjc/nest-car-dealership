import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCarDTO {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsString({ message: 'Brand must be a String.' })
  @IsOptional()
  readonly brand?: string;

  @IsString({ message: 'Model must be a String.' })
  @IsOptional()
  readonly model?: string;
}
