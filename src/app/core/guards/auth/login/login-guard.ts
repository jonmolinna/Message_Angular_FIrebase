import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../../../../store/auth/auth.store';

export const loginGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  // Si NO está autenticado, permitir acceso a login
  if (!authStore.isAuthenticated()) {
    return true;
  }

  // Si ya está autenticado, redirigir a message
  router.navigate(['/message']);

  return false;
};
