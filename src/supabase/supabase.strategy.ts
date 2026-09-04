import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, SecretOrKeyProvider, Strategy } from 'passport-jwt';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy, 'supabase') {
    constructor(private readonly config: ConfigService) {
        const url = config.get<string>('SUPABASE_URL');

        if (!url) {
            throw Error(
                'SUPABASE_URL não definido'
            );
        }

        const secretOrKeyProvider = {
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `${url}/auth/v1/.well-known/jwks.json`,
        } as unknown as SecretOrKeyProvider;

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKeyProvider,
            algorithms: ['RS256'],
        });
    }

    validate(payload: any): unknown {
        return !payload || !payload.sub
        ? (() => {
            throw new UnauthorizedException('Token inválido');
            })()
        : {
            id: payload.sub,
            email: payload.email ?? '',
            role: payload.role ?? 'authenticated',
            };
    }
}
