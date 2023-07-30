
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateUserDto {    
    id: string;
    version: number
    createdAt: number;
    updatedAt: number
    
    @IsNotEmpty({message: "This field must be filled"})
    @IsString({message: "Login  must be a string value"})
    login: string;

    @IsNotEmpty({message: "This field must be filled"})
    @IsString({message: "Password  must be a string value"})
    password: string;

    constructor(login: string, password: string, id: string,  version: number, createdAt: number, updatedAt) {
        this.login = login;
        this.password = password;
        this.id = id;
        this.version = version;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}