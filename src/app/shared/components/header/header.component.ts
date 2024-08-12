import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from "../../../core/services/user.service";
import { UserDetailsResponse } from "../../models/api/user-details-response.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchControl = new FormControl('');

  constructor(private router: Router, private userService: UserService) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(id => {
        if (id) {
          return this.userService.getUserById(id);
        } else {
          return of(null);
        }
      })
    ).subscribe((response: UserDetailsResponse | null) => {
      if (response && response.data) {
        this.router.navigate(['/user', response.data.id]);
      }
      else{
        this.router.navigate(['/users'])
      }
    });
  }
}
