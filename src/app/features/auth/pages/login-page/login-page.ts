import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FadeIn as FadeInDirective } from '../../../../shared/directive/fade-in/fade-in';
import { AuthStore } from '../../../../store/auth/auth.store';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-login-page',
  imports: [FadeInDirective],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  authStore = inject(AuthStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  // Flag para evitar múltiples redirecciones
  private hasRedirected = false;

  readonly toast = toast;

  loginWithGoogle(): void {
    this.authStore.signInWithGoogle();
  }

  // Effect para manejar errores
  errorEffect = effect(() => {  
    const error = this.authStore.error();

    if (error) {
      toast.error(error);
      this.authStore.clearError();
    }
  });

  // Effect para manejar login exitoso y redirección
  successEffect = effect(() => {
    const isAuthenticated = this.authStore.isAuthenticated();
    const isLoading = this.authStore.isLoading();

    // Si está autenticado, no está cargando, y no ha redirigido aún
    if (isAuthenticated && !isLoading && !this.hasRedirected) {
      this.hasRedirected = true; // Marcar como redirigido
      
      // Obtener returnUrl de los query params
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/message';
      
      console.log('Login exitoso, redirigiendo a:', returnUrl);
      
      // Redirigir a la URL original o a /message por defecto
      this.router.navigateByUrl(returnUrl);
    }
  });
}
