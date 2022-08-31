export interface ResetPasswordDto {
  verificationcode: string;
  newpassword: string;
}

export interface ResetPasswordReqDto {
  Body: ResetPasswordDto;
}

export interface ResetPasswordResStatusQuery {
  resultstatus: number;
  resultcode: string;
  resulterrormessage: string;
  resultid: number;
  resultindex: string;
}

export interface ResetPasswordResDataQuery {
  token: string;
}
