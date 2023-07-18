import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { Token, TokenUser } from './jwt.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: Token): Promise<TokenUser> {
    const user = await this.prismaService.user.findFirst({
      where: {
        google_id: payload.user.google_id,
      },
    });

    if (!user) throw new UnauthorizedException();

    return {
      id: user.id,
      google_id: user.google_id,
    };
  }
}
