import {User} from '../user.model';
import {Support} from '../support.model';

export interface UserListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: Support;
}
