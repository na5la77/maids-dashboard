import { Injectable } from '@angular/core';
import {UserDetailsResponse} from "../models/api/user-details-response.model";

@Injectable({
  providedIn: 'root',
})
export class CachingService {
  private cache: Map<string,UserDetailsResponse> = new Map<string, UserDetailsResponse>();

  get(key: string):UserDetailsResponse | undefined{
    return this.cache.get(key);
  }

  set(key: string, data: UserDetailsResponse) {
    this.cache.set(key, data);
  }

}
