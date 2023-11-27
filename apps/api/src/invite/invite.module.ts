import { Module } from '@nestjs/common';
import { InviteController } from '@/invite/application/invite.controller';
import { InviteConverter } from '@/invite/application/invite.converter';
import { UserModule } from '@/user/user.module';
import { InviteService } from '@/invite/domain/invite.service';

@Module({
  imports: [UserModule],
  controllers: [InviteController],
  providers: [InviteConverter, InviteService],
  exports: [InviteConverter],
})
export class InviteModule {}
