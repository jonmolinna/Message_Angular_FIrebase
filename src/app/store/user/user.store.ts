import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { USER } from '../../core/models';
import { inject } from '@angular/core';
import { User } from '../../core/services';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

type UserState = {
  loading: boolean;
  user: USER | null;
  message: string | null;
  error: string | null;
};

const initialState: UserState = {
  loading: false,
  user: null,
  message: null,
  error: null,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userService = inject(User)) => ({
    getUser: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null, message: null, user: null })),
        switchMap((uid) =>
          userService.getUser(uid).pipe(
            tapResponse({
              next: (data) => {
                patchState(store, {
                  loading: false,
                  user: data,
                  message: 'Usuario cargando correctamente.',
                  error: null,
                });
              },
              error: (error: HttpErrorResponse) => {
                patchState(store, {
                  loading: false,
                  user: null,
                  message: null,
                  error: 'Ocurrio un error al cargar el usuario.',
                });
              },
            })
          )
        )
      )
    ),

    createOrUpdateUser: rxMethod<USER>(
      pipe(
        tap(() =>
          patchState(store, {
            loading: false,
            user: null,
            message: null,
            error: null,
          })
        ),
        switchMap((user) =>
          userService.createOrUpdateUser(user as any).then(
            () => {
              patchState(store, {
                loading: false,
                user,
                message: 'Se registro el usuario de manera correcta',
                error: null,
              });
            },
            (err: HttpErrorResponse) => {
              patchState(store, {
                loading: false,
                user: null,
                message: null,
                error: 'Erroi al registrar/actualizar usuario',
              });
            }
          )
        )
      )
    ),

    clearUser: () => {
      patchState(store, {
        user: null,
      });
    },

    clearError: () => {
      patchState(store, {
        error: null,
      });
    },
  }))
);
