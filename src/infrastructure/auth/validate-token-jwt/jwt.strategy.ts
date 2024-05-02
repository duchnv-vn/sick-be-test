import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import {
  AUTH0_AUDIENCE,
  AUTH0_ISSUER_URL,
  AUTH0_TOKEN_SIGN_ALG,
} from '../../../configs/envs';

@Injectable()
export class ValidateTokenJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: AUTH0_AUDIENCE,
      issuer: AUTH0_ISSUER_URL,
      algorithms: [AUTH0_TOKEN_SIGN_ALG],
    });
  }

  validate(payload: any) {
    return { userInfo: payload.aud[1] };
  }
}
