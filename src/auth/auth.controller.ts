import { Controller, HttpStatus, HttpCode, Post, Body, UseGuards, Get, Request, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './decorators/public.decorator';


@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    signIn(@Body() signInDto: Record<string, any>): Promise<any> {
        return this.authService.signIn(signInDto.login, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    @Public()
    signUp(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.authService.signUp(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
