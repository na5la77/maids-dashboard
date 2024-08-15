import {User} from '../user.model';
import {Support} from '../support.model';

export interface UserDetailsResponse {
  data: User;
  support: Support;
}
