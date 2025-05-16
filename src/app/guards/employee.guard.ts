import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.user$.pipe(
    map(user => !!user)
  );
};
