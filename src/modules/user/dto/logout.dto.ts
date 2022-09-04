export interface LogoutDto {
  token: string;
}

export interface LogoutReqDto {
  Body: LogoutDto;
}

export interface LogoutResStatusQuery {
  resultstatus: number;
  resultcode: string;
  resulterrormessage: string;
  resultid: number;
  resultindex: string;
}

export interface LogoutResDataQuery {
  token: string;
}
