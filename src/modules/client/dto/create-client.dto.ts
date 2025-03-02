import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, Matches } from "class-validator";

export class CreateClientDto {

    @ApiProperty()
    @IsString()
    @Length(5,40)
    @Matches(/^[A-Za-z\s]+$/, { message: "client name must only contain characters" })
    client_name:string;
    
    @ApiProperty()
    @IsString()
    @Length(5,50)
    @Matches(/^[A-Za-z\s]+$/, { message: "client last name must only contain characters" })
    client_last_name:string;
    
    @ApiProperty()
    @Length(10,10)
    @Matches(/^[0-9]+$/, { message: "client phone must only contain numbers" })
    client_phone:string;

    @ApiProperty()
    @IsString()
    @Length(5,40)
    @Matches(/^[A-Za-z\s]+$/, { message: "client birthplace name must only contain characters" })
    client_birthplace:string;

    @ApiProperty()
    @IsString()
    @Length(10,10)
    client_social_number:string;
}
