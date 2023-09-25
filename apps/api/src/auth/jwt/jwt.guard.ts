import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}

@Injectable()
export class OptionalJwtGuard extends AuthGuard(['jwt', 'anonymous']) {}
