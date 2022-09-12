export interface GetProductDto {
  token: string;
  indexproduk: string;
  kodeproduk: string;
  namaproduk: string;
  jenisproduk: string;
  kuantityproduk: string;
  hargabeliproduk: string;
  hargajualproduk: string;
}

export interface GetProductReqDto {
  Body: GetProductDto;
}
