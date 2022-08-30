export interface SigninDto {
  username: string;
  password: string;
}

export interface SigninReqDto {
  Body: SigninDto;
}

export interface SigninResStatusQuery {
  resultstatus: number;
  resultcode: string;
  resulterrormessage: string;
  resultid: number;
  resultindex: string;
}

export interface SigninResDataQuery {
  token: string;
}
