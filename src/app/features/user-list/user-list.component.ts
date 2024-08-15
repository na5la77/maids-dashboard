import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUsers } from '../../state/users/user.actions';
import {selectUsers} from '../../state/users/user.selectors';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.state';
import { AppStatusEnum } from '../../core/models/enums/app-status.enum';
import { UserState } from '../../state/users/user.reducer';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'avatar', 'name', 'email', 'initials'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  totalUsers: number = 0;
  pageSize: number = 6;
  startingPage: number = 0;
  id: number = 40;
  usersObservable$!: Observable<Map<number, User[]>>;
  userState$!: Observable<UserState>;
  currentStatus: AppStatusEnum = AppStatusEnum.loading;

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private router: Router,
  ) {
    this.userState$ = this.store.select(selectUsers);
  }

  ngOnInit() {
    this.fetchUsers(this.startingPage);
  }

  fetchUsers(page: number) {
    page++;
    this.store.dispatch(loadUsers({ page }));
    this.userState$.subscribe((response) => {
      this.dataSource.data = response.users.get(page) ?? [];
      this.totalUsers = 10;
    });
  }

  onPaginateChange(event: PageEvent) {
    this.fetchUsers(event.pageIndex);
  }

  navigateToUserDetails(row: any) {
    this.router.navigate(['/user', row.id]);
  }

  searchEvent($event: string | null) {
    if ($event) {
      this.userService.getUserById($event).subscribe((res) => {
        if (res && res.data) {
          this.dataSource.data = [res.data];
        } else {
          this.resetTableData();
        }
      });
    } else {
      this.resetTableData();
    }
  }

  private resetTableData() {
    this.totalUsers = 0;
    this.startingPage = 0;
    this.dataSource.data = [];
    this.fetchUsers(this.startingPage);
  }

  showLoading() {
    this.userState$.subscribe((val) => (this.currentStatus = val.status));
  }
}
