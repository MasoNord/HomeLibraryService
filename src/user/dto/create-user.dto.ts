import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

interface CreateUserDtoInterface {
  login: string;
  password: string;
}

export class CreateUserDto implements CreateUserDtoInterface {
  @ApiProperty({ example: 'DoggyFace' })
  @IsString()
  public login: string;

  @ApiProperty({ example: 'qwerty1234' })
  @IsString()
  public password: string;
}
