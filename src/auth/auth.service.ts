import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/nest/prismanpx/prisma.service';
import { v4 } from 'uuid';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { hashPassword } from 'src/utils/hashing-password';
import { comparePasswords } from 'src/utils/check-password';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private prisma: PrismaService
    ) {}

    async signIn(login: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByLogin(login);
        if ((await comparePasswords(pass, user?.password)) === false) {
            throw new UnauthorizedException();
        }
        const playload = {sub: user.id, userLogin: user.login};
        return {
            acess_token: await this.jwtService.signAsync(playload)
        };
    }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        const hashedPassword = hashPassword(createUserDto.password);
        
        const user = await this.prisma.user.upsert({
            where: {
              id: v4(),
            },
            update: {},
            create: {
              id: v4(),
              login: createUserDto.login,
              password: (await hashedPassword).toString(),
              version: 1,
              createdAt: new Date().getTime() / 1000,
              updatedAt: new Date().getTime() / 1000,
            },
          });
      
        return new User(user);
    }
}
