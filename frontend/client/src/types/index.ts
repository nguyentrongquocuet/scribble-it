export interface User {
  id: string;
  username: string;
  avatar?: string;
}

export interface BaseAuthToken {
  token: string;
  expireAt: number;
}

export interface UserAuthToken extends BaseAuthToken {
  user: User;
}
