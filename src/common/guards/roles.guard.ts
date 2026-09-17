import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@supabase/supabase-js';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  private resolveUserRole(user?: User): string | null {
    const candidates = [
      user?.app_metadata?.role,
      user?.role,
      user?.user_metadata?.role,
    ];

    const role = candidates.find(
      (candidate): candidate is string =>
        typeof candidate === 'string' && candidate.trim().length > 0,
    );

    return role ? role.trim().toLowerCase() : null;
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: User }>();
    const userRole = this.resolveUserRole(request.user);
    const normalizedRequiredRoles = requiredRoles.map((role) => role.trim().toLowerCase());

    if (!userRole || !normalizedRequiredRoles.includes(userRole)) {
      throw new ForbiddenException('Usuário sem permissão para esta operação');
    }

    return true;
  }
}