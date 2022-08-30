export interface SignupDto {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export interface SignupReqDto {
  Body: SignupDto;
}

export interface SignupResStatusQuery {
  resultstatus: number;
  resultcode: string;
  resulterrormessage: string;
  resultid: number;
  resultindex: string;
}

export interface SignupResDataQuery {
  userindex: string;
  username: string;
  userfullname: string;
  useremail: string;
}
