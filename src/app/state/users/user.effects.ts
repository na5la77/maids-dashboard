import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../core/services/user.service';
import {loadUsers, loadUsersFailure, loadUsersSuccess} from './user.actions';
import {catchError, from, map, of, switchMap} from 'rxjs';

@Injectable()
export class UserEffects {
  private api = inject(UserService)
  private actions$ = inject(Actions);


  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        from(this.api.getUsers(1)).pipe(
          map((users) => loadUsersSuccess({users: users.data})),
          catchError((error) => of(loadUsersFailure({error})))
        )
      )
    )
  );

}
