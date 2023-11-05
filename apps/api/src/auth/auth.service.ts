import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/config/prisma.service';
import { GoogleUser } from './strategies/google.model';
import { nanoid } from '@/common/nanoid';
import { Token, TokenUser } from '@/auth/jwt/jwt.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async loginWithGoogle(googleUser: GoogleUser): Promise<string> {
    let queryUser = await this.prismaService.user.findFirst({
      where: {
        google_id: googleUser.id,
      },
    });

    if (!queryUser) {
      queryUser = await this.prismaService.user.create({
        data: {
          id: nanoid(),
          google_id: googleUser.id,
          name: [googleUser.firstName, googleUser.lastName].join(' '),
        },
      });
    }

    const payload: Token = {
      user: {
        id: queryUser.id,
        name: queryUser.name,
        google_id: queryUser.google_id,
        google_mail: googleUser.email,
        _permissions: {
          isAuthorized: queryUser.isAuthorized,
        },
      },
    };

    return this.jwtService.sign(payload, { secret: process.env['JWT_SECRET'] });
  }
}
