export interface IAuthUser {
  email: string;
  fullName: string;
}

interface IUser {

}

export interface IGame {
  id: string;
  name: string;
  creator: IUser;
}
