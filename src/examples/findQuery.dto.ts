import { Transform, Type } from "class-transformer";
import { IsOptional, IsPositive, IsString } from "class-validator";

export class FindDentistasQueryDto{
  
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  dentista?:string;
  
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  telefono?:string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  domicilio?:string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  cedula?:string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  creacion?:string;
  
  @IsOptional()
  @IsPositive()
  @Type( () => Number)
  limit?:number;
  
  @IsOptional()
  @Type( () => Number)
  offset?:number;
}