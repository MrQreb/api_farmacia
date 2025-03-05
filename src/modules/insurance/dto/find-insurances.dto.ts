import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsOptional, IsPositive, IsString } from "class-validator";

export class FindInsurancesQueryDto{
  
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  insurance?:string; 

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPositive()
  @Type( () => Number)
  limit?:number;
  
  @ApiProperty({ required: false })
  @IsOptional()
  @Type( () => Number)
  offset?:number;
}