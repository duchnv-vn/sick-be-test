import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ValidateTokenJwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [ValidateTokenJwtStrategy],
  exports: [PassportModule],
})
export class ValidateTokenJWTModule {}
