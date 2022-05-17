/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface User {
  name: string;
  password: string;
}

export interface UpdateUser {
  oldName: string;
  newName: string;
}

export interface Params {
  name?: string;
}
