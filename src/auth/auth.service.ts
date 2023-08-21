import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async sigIn(login: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByLogin(login);
        if (user?.password != pass) {
            throw new UnauthorizedException();
        }
        const playload = {sub: user.id, userLogin: user.login};
        return {
            acess_token: await this.jwtService.signAsync(playload)
        };
    }
}
