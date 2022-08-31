export interface ActivateUserDto {
  token: string;
}

export interface ActivateUserReqDto {
  Body: ActivateUserDto;
  Params: ActivateUserDto;
}

export interface ActivateUserResStatusQuery {
  resultstatus: number;
  resultcode: string;
  resulterrormessage: string;
  resultid: number;
  resultindex: string;
}

export interface ActivateUserResDataQuery {
  token: string;
}
