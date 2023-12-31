import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GoogleUser } from './google.model';
import * as process from 'process';
import { AuthService } from '@/auth/auth.service';
import { JWTUser } from '@/auth/jwt/jwt.decorator';

@Controller('auth/google')
export class GoogleController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@JWTUser() user: GoogleUser, @Res() res: Response) {
    const token = await this.authService.loginWithGoogle(user);

    res.cookie('token', token, {
      sameSite: true,
      httpOnly: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    });
    return res.redirect(process.env['CLIENT_URL']);
  }
}
