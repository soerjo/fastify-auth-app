export interface AddProductDto {
  token: string;
  namaproduk: string;
  jenisproduk: string;
  kuantityproduk: string;
  hargabeliproduk: string;
  hargajualproduk: string;
}

export interface AddProductReqDto {
  Body: AddProductDto;
}
