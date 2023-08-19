import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 } from 'uuid';
import { PrismaService } from 'src/nest/prismanpx/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async create(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.prisma.user.upsert({
      where: {
        id: v4(),
      },
      update: {},
      create: {
        id: v4(),
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        createdAt: new Date().getTime() / 1000,
        updatedAt: new Date().getTime() / 1000,
      },
    });

    return new User(user);
  }

  public async findAll(): Promise<any> {
    return (await this.prisma.user.findMany()).map((u) => new User(u));
  }

  public async findOne(id: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (user === null)
      throw new HttpException(
        'Record has not been found',
        HttpStatus.NOT_FOUND,
      );

    return new User(user);
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
    updatedAt: number,
  ): Promise<any> {
    let user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (user === null)
      throw new HttpException(
        'Record has not been found',
        HttpStatus.NOT_FOUND,
      );

    if (updateUserDto.oldPassword !== user.password)
      throw new HttpException('oldPassword is invalid', HttpStatus.FORBIDDEN);

    const version = user.version;

    user = await this.prisma.user.update({
      where: { id },
      data: {
        password: updateUserDto.newPassword,
        version: version + 1,
        updatedAt: updatedAt,
      },
    });

    return new User(user);
  }

  public async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (user === null)
      throw new HttpException(
        'Record has not been found',
        HttpStatus.NOT_FOUND,
      );

    await this.prisma.user.delete({
      where: { id },
    });
  }
}
