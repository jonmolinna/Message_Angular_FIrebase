import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../../../../store/auth/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  
  console.log("AuthGuard: Verifying authentication for route:", state.url);

  // Esperar a que el store esté listo
  if (!authStore.isReady()) {
    console.log("AuthGuard: AuthStore not ready yet.");
    return false;
  }

  // Verificar si está autenticado y tiene token válido
  if (authStore.isAuthenticated() && authStore.hasValidToken()) {
    console.log("AuthGuard: User is authenticated, allowing access to:", state.url);
    return true;
  }

  // Si no está autenticado, redirigir a login
  router.navigate(['/auth/login'], {
    queryParams: { returnUrl: state.url },
  });

  return false;
};
