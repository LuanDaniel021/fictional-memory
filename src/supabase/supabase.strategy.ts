import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy, 'supabase') {
    constructor(private readonly config: ConfigService) {
        const url = config.get<string>('SUPABASE_URL');
        const key = config.get<string>('SUPABASE_SECRET_KEY');

        if (!url || !key) {
            throw Error(
                'SUPABASE_URL ou SUPABASE_SECRET_KEY, não definido'
            );
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:key,
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
