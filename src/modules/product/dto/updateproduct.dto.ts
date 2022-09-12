export interface UpdateProductDto {
  token: string;
  kodeproduk: string;
  namaproduk: string;
  jenisproduk: string;
  kuantityproduk: string;
  hargabeliproduk: string;
  hargajualproduk: string;
}

export interface UpdateProductReqDto {
  Body: UpdateProductDto;
}
