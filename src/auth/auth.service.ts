import { Injectable, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/nest/prismanpx/prisma.service';
import { v4 } from 'uuid';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { hashData } from 'src/utils/hashing-password';
import { compareHashedData } from 'src/utils/check-password';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private prisma: PrismaService,
        private configService: ConfigService
    ) {}

    async signIn(login: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByLogin(login);
        if ((await compareHashedData(pass, user?.password)) === false) {
            throw new UnauthorizedException();
        }
        
        const tokens = await this.getTokens(user.id, user.login);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        const userExists = await this.userService.checkUser(createUserDto.login);

        if(userExists === true)
            throw new BadRequestException('User already exists');

        const hashedPassword = hashData(createUserDto.password);
        const userId = v4();
        const tokens = await this.getTokens(userId, createUserDto.login);
        const hashedRefreshToken = (await hashData(tokens.refreshToken)).toString();
        
        const user = await this.prisma.user.upsert({
            where: {
              id: userId,
            },
            update: {},
            create: {
              id: v4(),
              login: createUserDto.login,
              password: (await hashedPassword).toString(),
              version: 1,
              createdAt: new Date().getTime() / 1000,
              updatedAt: new Date().getTime() / 1000,
              refreshToken: hashedRefreshToken
            },
        });
        
        return tokens;
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = (await hashData(refreshToken)).toString();
        await this.userService.setNewRefreshToken(userId, hashedRefreshToken);
      }

    async getTokens(userId: string, userLogin: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    id: userId,
                    login: userLogin,
                    test: "Test"
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: `${process.env.EXPIRES_IN}m`
                },
            ),
            this.jwtService.signAsync(
                {
                    id: userId,
                    login: userLogin,
                    test: "Test"
                },
                {
                    secret: this.configService.get<string>('JWT_REFERSH_SECRET'),
                    expiresIn: `${process.env.REFRESH_EXPIRES_IN}m`
                },
            ),
        ]);
        return {
            accessToken,
            refreshToken
        }
    }
    async refreshTokens(userId: string) {
        const user = await this.userService.findOne(userId);
        
        if(!user || !user.refreshToken)
            throw new ForbiddenException('Access Denied');
        
        const tokens = await this.getTokens(user.id, user.login);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        
        return tokens;

    }
}
