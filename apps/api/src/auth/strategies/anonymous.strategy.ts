import { Strategy } from 'passport';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnonymousStrategy extends PassportStrategy(Strategy, 'anonymous') {
  constructor() {
    super();
  }

  authenticate() {
    return this.success({});
  }
}
