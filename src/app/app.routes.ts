import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/auth/login/login-guard';
import { authGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canMatch: [loginGuard],
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'message',
    loadChildren: () => import('./features/message/message.routes').then((m) => m.MESSAGE_ROUTES),
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];

// canMatch: [authGuard],
// canActivate