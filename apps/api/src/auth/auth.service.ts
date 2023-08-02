import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../config/prisma.service';
import { GoogleUser } from './strategies/google.model';

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
          google_id: googleUser.id,
          name: [googleUser.firstName, googleUser.lastName].join(' '),
        },
      });
    }

    return this.jwtService.sign(
      {
        user: {
          id: queryUser.id,
          google_id: googleUser.id,
        },
      },
      { secret: process.env['JWT_SECRET'] },
    );
  }
}
