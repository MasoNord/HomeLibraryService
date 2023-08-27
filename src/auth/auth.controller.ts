import { Controller, HttpStatus, HttpCode, Post, Body, UseGuards, Get, Req, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './decorators/public.decorator';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @Public()
    @ApiOperation({summary: "Login in personal account"})
    @ApiBody({type: CreateUserDto})
    @ApiOkResponse({description: "User successfully loged in"})
    @ApiBadRequestResponse({
        description: 'Dto is invalid'
    })
    @ApiUnauthorizedResponse({
        description: "Password doesn't match"
    })
    @HttpCode(HttpStatus.OK)
    signIn(@Body() signInDto: Record<string, any>): Promise<any> {
        return this.authService.signIn(signInDto.login, signInDto.password);
    }

    @Post('signup')
    @Public()
    @ApiOperation({summary: "Creat new account"})
    @ApiBody({type: CreateUserDto})
    @ApiBadRequestResponse({
        description: 'Dto is invalid'
    })
    @ApiCreatedResponse({
        description: 'User successfully signed up'
    })
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.authService.signUp(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiOperation({summary: "Get user's profile usering tokens"})
    @ApiOkResponse({description: 'OK'})
    @ApiUnauthorizedResponse({description: 'Access token is expired, try another one'})
    @ApiBearerAuth()
    @ApiParam({name: 'access_token', format: 'JWT'})
    getProfile(@Req() req) {
        return req.user;
    }

    @UseGuards(AuthGuard)
    @Post('refresh')
    @ApiOperation({summary: "Get user's profile usering tokens"})
    @ApiOkResponse({description: 'OK'})
    @ApiUnauthorizedResponse({description: 'Refresh token is expired, try another one'})
    @ApiBearerAuth()
    @ApiParam({name: 'refresh_token', format: 'JWT'})
    @HttpCode(HttpStatus.OK)
    refreshTokens(@Req() req) {
        const userId = req.user.id;
        return this.authService.refreshTokens(userId);
    }

}
