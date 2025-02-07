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
}
