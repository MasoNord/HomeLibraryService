import {IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

interface UpdateUserDtoInterface {
    oldPassword: string,
    newPassword: string
}

export class UpdateUserDto implements UpdateUserDtoInterface {
    @ApiProperty({description: "Old password"})
    @IsString()
    oldPassword: string

    @ApiProperty({description: "New password"})
    @IsString()
    newPassword: string

}
