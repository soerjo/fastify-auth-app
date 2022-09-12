export interface BodyDetailProductDto {
  token: string;
}

export interface ParamKodeProductDto {
  kodeproduk: string;
}

export interface DetailProductReqDto {
  Body: BodyDetailProductDto;
  Params: ParamKodeProductDto;
}
