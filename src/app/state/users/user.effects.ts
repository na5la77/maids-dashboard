import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../core/services/user.service';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './user.actions';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { User } from '../../core/models/user.model';
import { selectUsers, selectUsersMap } from './user.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class UserEffects {
  private api = inject(UserService);
  private actions$ = inject(Actions);
  private store = inject(Store<AppState>);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      withLatestFrom(this.store.select(selectUsersMap)),
      switchMap(([{ page }, usersMap]) => {
        const cachedUsers = usersMap.get(page);
        if (cachedUsers) {
          return of(loadUsersSuccess({ users: cachedUsers, page }));
        } else {
          return this.api.getUsers(page).pipe(
            map((users) => loadUsersSuccess({ users: users.data, page })),
            catchError((error) => of(loadUsersFailure({ error })))
          );
        }
      })
    )
  );
}
