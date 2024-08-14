import {createAction, props} from "@ngrx/store";

export const testAction = createAction(
  '[User] Test State',
  props<{ content: string }>()
);
