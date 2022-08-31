export interface ForgotPasswordDto {
  username: string;
}

export interface ForgotPasswordReqDto {
  Body: ForgotPasswordDto;
}

export interface ForgotPasswordResStatusQuery {
  resultstatus: number;
  resultcode: string;
  resulterrormessage: string;
  resultid: number;
  resultindex: string;
}

export interface ForgotPasswordResDataQuery {
  token: string;
}
