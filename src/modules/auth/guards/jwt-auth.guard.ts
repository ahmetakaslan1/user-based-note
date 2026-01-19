import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // 1. Önce @Public etiketi var mı diye kontrol et
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 2. Eğer @Public varsa, kapıyı aç (true döndür)
    if (isPublic) {
    
      return true;
    }
    
    console.log('jwt-auth.guard.ts');
    // 3. Eğer @Public YOKSA, normal token kontrolü yap (super.canActivate)
    return super.canActivate(context);
  }
}
