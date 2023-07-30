import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsString()
    oldPassword: string

    @IsNotEmpty()
    @IsString()
    newPassword: string

    constructor(oldPassword: string, newPassword: string) {
        super();
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}
