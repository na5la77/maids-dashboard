import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {UserDetailsResponse} from '../models/api/user-details-response.model';
import {UserListResponse} from '../models/api/user-list-response.model';
import {CachingService} from './caching.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private cachingService: CachingService,
  ) {
  }

  getUsers(page: number): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${this.baseUrl}?page=${page}`);
  }

  getUserById(id: string): Observable<UserDetailsResponse | null> {
    const cachedData = this.cachingService.get(id);

    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get<UserDetailsResponse>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching user:', error);
        return of(null);
      }),
      map((response) => {
        if (response) {
          this.cachingService.set(id, response);
        }
        return response;
      }),
    );
  }
}
