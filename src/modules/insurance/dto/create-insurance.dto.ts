import { IsString, Length } from "class-validator";

export class CreateInsuranceDto {
    
    @IsString()
    @Length(3,25)
    insurance_name:string;
}
