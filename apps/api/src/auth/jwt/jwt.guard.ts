import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {}
export class OptionalJwtGuard extends AuthGuard(['jwt', 'anonymous']) {}
