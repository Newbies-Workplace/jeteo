import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from '@/config/prisma.service';
import { JWTUser } from '@/auth/jwt/jwt.decorator';
import { TokenUser } from '@/auth/jwt/jwt.model';
import { JwtGuard } from '@/auth/jwt/jwt.guard';
import { InviteConverter } from '@/invite/application/invite.converter';
import { InviteDetailsResponse } from 'shared/model/invite/response/inviteResponse';
import { assertInviteWriteAccess } from '@/auth/auth.methods';
import { InviteService } from '@/invite/domain/invite.service';

@Controller('/rest/v1/invites')
export class InviteController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly inviteConverter: InviteConverter,
    private readonly inviteService: InviteService,
  ) {}

  @Get('/@me')
  @UseGuards(JwtGuard)
  async getMyInvites(
    @JWTUser() user: TokenUser,
  ): Promise<InviteDetailsResponse[]> {
    const invites = await this.prismaService.invite.findMany({
      where: {
        mail: user.google_mail,
      },
    });

    return await Promise.all(
      invites.map((invite) => this.inviteConverter.convertDetails(invite)),
    );
  }

  @Post('/:id/accept')
  @UseGuards(JwtGuard)
  async acceptInvite(@Param('id') id: string, @JWTUser() user: TokenUser) {
    const invite = await this.prismaService.invite.findUnique({
      where: {
        id,
      },
    });

    assertInviteWriteAccess(user, invite);

    await this.inviteService.acceptInvite(invite, user);
  }

  @Post('/:id/reject')
  @UseGuards(JwtGuard)
  async rejectInvite(@Param('id') id: string, @JWTUser() user: TokenUser) {
    const invite = await this.prismaService.invite.findUnique({
      where: {
        id,
      },
    });

    assertInviteWriteAccess(user, invite);

    await this.inviteService.rejectInvite(invite);
  }
}
