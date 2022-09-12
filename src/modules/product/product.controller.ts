import { FastifyReply, FastifyRequest } from "fastify";
import { ObjectReturnData } from "../../common/type/objectResponseData";
import { execQuery, justQuery } from "../../configs/db_mysql";
import { AddProductReqDto } from "./dto/addproduct.dto";
import { DeleteProductReqDto } from "./dto/deleteproduct.dto";
import { DetailProductReqDto } from "./dto/detailproduct.dto copy";
import { GetProductReqDto } from "./dto/getproduct.dto";
import { UpdateProductReqDto } from "./dto/updateproduct.dto";

export const getProduct = async (
  req: FastifyRequest<GetProductReqDto>,
  reply: FastifyReply
) => {
  let objReturnData: ObjectReturnData = {
    status: {
      status: 1,
      code: "0800000",
      errormessage: "",
      id: 0,
      index: "",
    },
  };

  try {
    const response = await justQuery(
      `SELECT COUNT(*) AS found FROM users WHERE token = '${req.body.token}'`
    );
    if (!response[0].found) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "155555";
      objReturnData.status.errormessage = "token is not valid";
      objReturnData.status.id = 0;
      objReturnData.status.index = "";
    } else {
      const dataResponse = await justQuery(`SELECT * FROM produk`);
      objReturnData.result = dataResponse;
    }
  } catch (error) {
    objReturnData = {
      status: {
        status: 0,
        code: "059999",
        errormessage: "",
        id: 0,
        index: "",
      },
    };

    console.log(error);
  }
  reply.code(200).send(objReturnData);
};

export const detailProduct = async (
  req: FastifyRequest<DetailProductReqDto>,
  reply: FastifyReply
) => {
  let objReturnData: ObjectReturnData = {
    status: {
      status: 1,
      code: "0800000",
      errormessage: "",
      id: 0,
      index: "",
    },
  };

  try {
    const response = await justQuery(
      `SELECT COUNT(*) AS found FROM users WHERE token = '${req.body.token}'`
    );

    if (!response[0].found) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "155555";
      objReturnData.status.errormessage = "token is not valid";
      objReturnData.status.id = 0;
      objReturnData.status.index = "";
    } else {
      const dataResponse = await justQuery(
        `SELECT * FROM produk WHERE kodeproduk = '${req.params.kodeproduk}'`
      );
      objReturnData.result = dataResponse[0];
    }
  } catch (error) {
    objReturnData = {
      status: {
        status: 0,
        code: "059999",
        errormessage: "",
        id: 0,
        index: "",
      },
    };

    console.log(error);
  }
  reply.code(200).send(objReturnData);
};

export const addProduct = async (
  req: FastifyRequest<AddProductReqDto>,
  reply: FastifyReply
) => {
  let objReturnData: ObjectReturnData = {
    status: {
      status: 1,
      code: "0800000",
      errormessage: "",
      id: 0,
      index: "",
    },
  };

  try {
    const response = await justQuery(
      `SELECT COUNT(*) AS found FROM users WHERE token = '${req.body.token}'`
    );
    if (!response[0].found) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "155555";
      objReturnData.status.errormessage = "token is not valid";
      objReturnData.status.id = 0;
      objReturnData.status.index = "";
    } else {
      const response = await execQuery(`CALL spaddproduct(?,?,?,?,?)`, [
        req.body.namaproduk,
        req.body.jenisproduk,
        req.body.kuantityproduk,
        req.body.hargabeliproduk,
        req.body.hargajualproduk,
      ]);
      objReturnData.status.status = response[0].resultstatus;
      objReturnData.status.code = response[0].resultcode;
      objReturnData.status.errormessage = response[0].resulterrormessage;
      objReturnData.status.id = response[0].resultid;
      objReturnData.status.index = response[0].resultindex;
    }
  } catch (error) {
    objReturnData = {
      status: {
        status: 0,
        code: "059999",
        errormessage: "",
        id: 0,
        index: "",
      },
    };

    console.log(error);
  }
  reply.code(200).send(objReturnData);
};

export const updateProduct = async (
  req: FastifyRequest<UpdateProductReqDto>,
  reply: FastifyReply
) => {
  let objReturnData: ObjectReturnData = {
    status: {
      status: 1,
      code: "0800000",
      errormessage: "",
      id: 0,
      index: "",
    },
  };

  try {
    const response = await justQuery(
      `SELECT COUNT(*) AS found FROM users WHERE token = '${req.body.token}'`
    );
    if (!response[0].found) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "155555";
      objReturnData.status.errormessage = "token is not valid";
      objReturnData.status.id = 0;
      objReturnData.status.index = "";
    } else {
      const response = await execQuery(`CALL spupdateproduct(?,?,?,?,?,?)`, [
        req.body.kodeproduk,
        req.body.namaproduk,
        req.body.jenisproduk,
        req.body.kuantityproduk,
        req.body.hargabeliproduk,
        req.body.hargajualproduk,
      ]);
      objReturnData.status.status = response[0].resultstatus;
      objReturnData.status.code = response[0].resultcode;
      objReturnData.status.errormessage = response[0].resulterrormessage;
      objReturnData.status.id = response[0].resultid;
      objReturnData.status.index = response[0].resultindex;
    }
  } catch (error) {
    objReturnData = {
      status: {
        status: 0,
        code: "059999",
        errormessage: "",
        id: 0,
        index: "",
      },
    };

    console.log(error);
  }
  reply.code(200).send(objReturnData);
};

export const deleteProduct = async (
  req: FastifyRequest<DeleteProductReqDto>,
  reply: FastifyReply
) => {
  let objReturnData: ObjectReturnData = {
    status: {
      status: 1,
      code: "0800000",
      errormessage: "",
      id: 0,
      index: "",
    },
  };

  try {
    const response = await justQuery(
      `SELECT COUNT(*) AS found FROM users WHERE token = '${req.body.token}'`
    );
    if (!response[0].found) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "155555";
      objReturnData.status.errormessage = "token is not valid";
      objReturnData.status.id = 0;
      objReturnData.status.index = "";
    } else {
      const response = await execQuery(`CALL spdeleteproduct(?)`, [
        req.body.kodeproduk,
      ]);
      objReturnData.status.status = response[0].resultstatus;
      objReturnData.status.code = response[0].resultcode;
      objReturnData.status.errormessage = response[0].resulterrormessage;
      objReturnData.status.id = response[0].resultid;
      objReturnData.status.index = response[0].resultindex;
    }
  } catch (error) {
    objReturnData = {
      status: {
        status: 0,
        code: "059999",
        errormessage: "",
        id: 0,
        index: "",
      },
    };

    console.log(error);
  }
  reply.code(200).send(objReturnData);
};
