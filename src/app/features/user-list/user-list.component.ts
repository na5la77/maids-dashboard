import {Component, Injectable, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import {User} from "../../shared/models/user.model";
import {UserService} from "../../core/services/user.service";
import {UserListResponse} from "../../shared/models/api/user-list-response.model";
import {Store} from "@ngrx/store";
import {testAction} from "../../state/users/user.actions";
import {selectTestContent} from "../../state/users/user.selectors";
import {AppState} from "../../state/app.state";
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'avatar', 'name', 'email', 'initials'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  totalUsers: number = 0;
  pageSize: number = 6;
  startingPage: number = 0;


  constructor(private userService: UserService, private store: Store<AppState>) {
  }


  ngOnInit() {
    this.fetchUsers(this.startingPage);
    this.store.dispatch(testAction({content: "Date.now().toString()"}))
  }

  fetchUsers(page: number) {
    this.userService.getUsers(page + 1).subscribe((response: UserListResponse) => {
      this.dataSource.data = response.data;
      this.totalUsers = response.total;
    });
  }

  onPaginateChange(event: PageEvent) {
    this.fetchUsers(event.pageIndex);
  }

  testMethod(row: any) {
    this.store.select(selectTestContent).subscribe(content => {
      console.log(content);  // Should log the testText value from state
    });
    console.log(row)
  }
}

@Injectable({
  providedIn: 'root',
})
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  // override nextPageLabel = '';
  // override previousPageLabel = '';
}
