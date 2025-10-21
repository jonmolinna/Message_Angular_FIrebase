import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../../../store/auth/auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  
  // Obtener el token del store
  const token = authStore.token();

  // Solo agregar token si existe y la URL necesita autenticación
  if (token && shouldAddToken(req.url)) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    
    return next(authReq);
  }

  return next(req);
};

/**
 * Determina si se debe agregar el token a la petición
 */
function shouldAddToken(url: string): boolean {
  // URLs que requieren autenticación
  const protectedUrls = [
    '/api/',           // Tu API backend
    'firestore',       // Firestore
    'firebase.com',    // Servicios de Firebase
    'googleapis.com'   // APIs de Google
  ];
  
  // URLs que NO requieren token
  const publicUrls = [
    '/auth/login',
    '/auth/register',
    '/public/'
  ];
  
  // Si es una URL pública, no agregar token
  if (publicUrls.some(publicUrl => url.includes(publicUrl))) {
    return false;
  }
  
  // Si es una URL protegida, agregar token
  return protectedUrls.some(protectedUrl => url.includes(protectedUrl));
}
