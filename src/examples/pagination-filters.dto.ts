import { Transform, Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, IsString, Length, Min, MinLength } from "class-validator";


export class PaginationDto {

    @IsOptional()
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value?.trim())
    // @Length(5,40)
    client_name?:string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value?.trim())
    // @Length(5,50)
    client_last_name?:string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value?.trim())
    // @Length(10,10)
    client_phone?:string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value?.trim())
    // @Length(5,40)
    client_birthplace?:string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value?.trim())
    // @Length(10,10)
    client_social_number?:string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    @Min(1)
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    @Min(0)
    offset?: number;


}
