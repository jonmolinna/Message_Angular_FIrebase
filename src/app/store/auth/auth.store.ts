import { User } from 'firebase/auth';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { Auth as AuthService } from '../../core/services';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { UserStore } from '../user';

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
};

// Estado Inicial
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  error: null,
  isInitialized: false,
};

// Crear el Store
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(initialState),
  withComputed((store) => ({
    isAuthenticated: computed<boolean>(() => !!store.user()),
    userDisplayName: computed<string>(() => store.user()?.displayName || 'Usuario'),
    userEmail: computed<string>(() => store.user()?.email || ''),
    userPhoto: computed<string>(() => store.user()?.photoURL || ''),
    userId: computed<string>(() => store.user()?.uid || ''),
    isReady: computed<boolean>(() => store.isInitialized() && !store.isLoading()),
    hasValidToken: computed<boolean>(() => !!store.token()),
  })),
  withMethods((store, authService = inject(AuthService), userStore = inject(UserStore)) => ({
    // Login con Google
    signInWithGoogle: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() => {
          return authService.signInWithGoogle().pipe(
            tapResponse({
              next: async (result) => {
                console.log('INIT LOGIN ---> ', store.isInitialized());
                try {
                  const token = await authService.getCurrentToken();

                  patchState(store, {
                    user: result.user,
                    token,
                    isLoading: false,
                    error: null,
                  });

                  if (token) {
                    localStorage.setItem(environment.key_token_storage, token);
                  }

                  userStore.createOrUpdateUser({
                    uid: result.user.uid,
                    displayName: result.user.displayName || '',
                    email: result.user.email || '',
                    photoURL: result.user.photoURL || '',
                  });
                } catch (error: any) {
                  patchState(store, {
                    isLoading: false,
                    error: 'Ocurrio un error al iniciar session',
                  });
                }
              },
              error: (error: HttpErrorResponse) => {
                patchState(store, {
                  isLoading: false,
                  error: 'Error al iniciar sesión con Google',
                });
              },
            })
          );
        })
      )
    ),

    // Logout
    signOut: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() => {
          return authService.signOut().pipe(
            tapResponse({
              next: () => {
                localStorage.removeItem(environment.key_token_storage);

                patchState(store, {
                  user: null,
                  token: null,
                  isLoading: false,
                  error: null,
                });
              },
              error: (error: HttpErrorResponse) => {
                patchState(store, {
                  isLoading: false,
                  error: error.message || 'Error al cerrar sessión',
                });
              },
            })
          );
        })
      )
    ),

    // Inicializar listener de auth state
    // También en initAuthListener cuando detecta un usuario autenticado:
    initAuthListener: rxMethod<void>(
      pipe(
        switchMap(() => {
          console.log('AQUI INICIANDO EL PROFILE');

          return authService.getAuthStateChanges().pipe(
            tap(async (user) => {
              if (user) {
                try {
                  console.log('INIT AUTH --> ', store.isInitialized());
                  console.log('aquii USER APP ---> ', user);
                  const token = await authService.getCurrentToken();

                  patchState(store, {
                    user,
                    token,
                    isInitialized: true,
                    isLoading: false,
                    error: null,
                  });

                  if (token) {
                    localStorage.setItem(environment.key_token_storage, token);
                  }

                  // REGISTRAR O ACTUALIAR UN USUARIO EN EL FIRESTORE
                  userStore.createOrUpdateUser({
                    uid: user.uid,
                    displayName: user.displayName || '',
                    email: user.email || '',
                    photoURL: user.photoURL || '',
                  });
                } catch (error) {
                  patchState(store, {
                    user,
                    token: null,
                    isInitialized: true,
                    isLoading: false,
                    error: 'Error al iniciar Sessión',
                  });
                }
              } else {
                // Cuando no hay usuario, limpiar también el UsuarioStore
                userStore.clearUser();

                localStorage.removeItem(environment.key_token_storage);

                patchState(store, {
                  user: null,
                  token: null,
                  isInitialized: true,
                  isLoading: false,
                  error: null,
                });
              }

              patchState(store, {
                user,
                isInitialized: true,
                isLoading: false,
                error: null,
              });
            })
          );
        })
      )
    ),

    // Refrescar Token
    restoreSession: () => {
      const storedToken = localStorage.getItem(environment.key_token_storage);
      const currentUser = authService.currentUser;

      if (storedToken && currentUser) {
        patchState(store, {
          user: currentUser,
          token: storedToken,
          isInitialized: true,
        });
      } else {
        localStorage.removeItem(environment.key_token_storage);
        patchState(store, {
          isInitialized: true,
        });
      }
    },

    // Limpiar el Error
    clearError: () => {
      patchState(store, { error: null });
    },

    // Reset
    reset: () => {
      localStorage.removeItem(environment.key_token_storage);
      patchState(store, initialState);
    },
  })),

  // Hooks para inicialización automática
  withHooks({
    onInit(store) {
      // Restaurar session si existe
      store.restoreSession();

      // Inicializar Listener
      store.initAuthListener();
    },
  })
);
