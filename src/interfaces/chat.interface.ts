export interface IUserData {
  id: string;
  name: string;
}

export interface IUserDto {
  name: string;
  room: string;
}

export interface IChat {
  from: string;
  message: string;
  id: string;
}

export interface IResponse {
  type: "error" | "success" | "leftRoom";
  message: string;
  userDto: IUserDto;
}
