import {createSelector} from "@ngrx/store";
import {UserState} from "./user.reducer";
import {AppState} from "../app.state";

export const selectUsers = (state: AppState) => state.users;
export const selectAllUsers = createSelector(
  selectUsers,
  (state: UserState) => state.users
)
export const selectUserError = createSelector(
  selectUsers,
  (state: UserState) => state.error
)
export const selectUserStatus = createSelector(
  selectUsers,
  (state: UserState) => state.status
)
