import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {RouterModule} from "@angular/router";
import {CustomMatPaginatorIntl, UserListComponent} from "./features/user-list/user-list.component"
import {UserDetailsComponent} from "./features/user-details/user-details.component";
import {HeaderComponent} from "./shared/components/header/header.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {InitialsPipe} from "./shared/pipes/initials.pipe";
import {MatTooltip} from "@angular/material/tooltip";
import {StoreModule} from "@ngrx/store";
import {userReducer} from "./state/users/user.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailsComponent,
    HeaderComponent,
    InitialsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltip,
    StoreModule.forRoot({users: userReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 5000 * 60 * 60,
    })

  ],
  providers: [{provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
