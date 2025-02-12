import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsString } from "class-validator";

export class RegisterDto {
    @IsString()
    @ApiProperty()
    username: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    firstName: string;

    @IsString()
    @ApiProperty()
    lastName: string;

    @IsString()
    @ApiProperty()
    phoneNumber: string;
}