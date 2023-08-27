import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from 'src/nest/prismanpx/prisma.module';
import * as dotenv from 'dotenv';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { ConfigService } from '@nestjs/config';

dotenv.config();

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    RefreshTokenStrategy,
    ConfigService
  ],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: `${process.env.EXPIRES_IN}m`},
    }),
    UserModule,
    PrismaModule
  ],
  exports: [AuthService],
})
export class AuthModule {}
