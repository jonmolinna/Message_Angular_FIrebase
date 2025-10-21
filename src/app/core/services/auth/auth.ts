import { inject, Injectable } from '@angular/core';
import {
  Auth as AuthGoogle,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  onAuthStateChanged,
  getIdToken,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private auth = inject(AuthGoogle);

  // Login con Google
  signInWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');

    return from(signInWithPopup(this.auth, provider));
  }

  // Metodo para logout
  signOut(): Observable<void> {
    return from(signOut(this.auth));
  }

  // Observable del estado de autenticación de Firebase
  getAuthStateChanges(): Observable<User | null> {
    return new Observable<User | null>((observer) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
      });

      // cleanup function
      return () => unsubscribe();
    });
  }

  // Obtener token del usuario actual
  async getCurrentToken(): Promise<string | null> {
    const user = this.auth.currentUser;

    if (user) {
      try {
        return await getIdToken(user);
      } catch (error) {
        throw error;
      }
    }

    return null;
  }


  // Obtener token con refresh forzado
  async getTokenWithRefresh(): Promise<string | null> {
    const user = this.auth.currentUser;

    if (user) {
      try {
        return await getIdToken(user, true); // true para forzar refresh
      } catch (error) {
        throw error;
      }
    }

    return null;
  }

  // Getter para el usuario actual (síncrono)
  get currentUser(): User | null {
    return this.auth.currentUser;
  }
}
// from() convierte Promesas a Observables
