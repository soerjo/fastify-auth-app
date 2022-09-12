import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AddProductReqDto } from "./dto/addproduct.dto";
import { DeleteProductReqDto } from "./dto/deleteproduct.dto";
import { DetailProductReqDto } from "./dto/detailproduct.dto copy";
import { GetProductReqDto } from "./dto/getproduct.dto";
import { UpdateProductReqDto } from "./dto/updateproduct.dto";

export const getProductMiddleware = (
  req: FastifyRequest<GetProductReqDto>,
  res: FastifyReply,
  done: (err?: FastifyError) => void
) => {
  const objReturnData = {
    status: {
      status: 1,
      code: "0800000",
      errormessage: "",
      id: 0,
      index: "",
    },
  };

  if (objReturnData.status.status) {
    if (req.body == null) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "Body NULL";
    }
  }

  if (objReturnData.status.status) {
    if (!req.body.token) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! token";
    }
  }

  if (!objReturnData.status.status) res.status(200).send(objReturnData);
  done();
};

export const detailProductMiddleware = (
  req: FastifyRequest<DetailProductReqDto>,
  res: FastifyReply,
  done: (err?: FastifyError) => void
) => {
  const objReturnData = {
    status: {
      status: 1,
      code: "0800000",
      errormessage: "",
      id: 0,
      index: "",
    },
  };

  if (objReturnData.status.status) {
    if (req.body == null) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "Body NULL";
    }
  }

  if (objReturnData.status.status) {
    if (!req.body.token) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! token";
    }
  }

  if (objReturnData.status.status) {
    if (!req.params.kodeproduk) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! kodepoduk";
    }
  }

  if (!objReturnData.status.status) res.status(200).send(objReturnData);
  done();
};

export const addProductMiddleware = (
  req: FastifyRequest<AddProductReqDto>,
  res: FastifyReply,
  done: (err?: FastifyError) => void
) => {
  const objReturnData = {
    status: {
      status: 1,
      code: "0800000",
      errormessage: "",
      id: 0,
      index: "",
    },
  };

  if (objReturnData.status.status) {
    if (req.body == null) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "Body NULL";
    }
  }

  if (objReturnData.status.status) {
    if (!req.body.token) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! token";
    }
  }

  if (objReturnData.status.status) {
    if (!req.body.jenisproduk) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! jenisproduk";
    }
  }

  if (objReturnData.status.status) {
    if (!req.body.kuantityproduk) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! kuantityproduk";
    }
  }
  if (objReturnData.status.status) {
    if (!req.body.namaproduk) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! namaproduk";
    }
  }
  if (objReturnData.status.status) {
    if (!req.body.hargabeliproduk) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! hargabeliproduk";
    }
  }
  if (objReturnData.status.status) {
    if (!req.body.hargajualproduk) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! hargajualproduk";
    }
  }

  if (!objReturnData.status.status) res.status(200).send(objReturnData);
  done();
};

export const updateProductMiddleware = (
  req: FastifyRequest<UpdateProductReqDto>,
  res: FastifyReply,
  done: (err?: FastifyError) => void
) => {
  const objReturnData = {
    status: {
      status: 1,
      code: "0800000",
      errormessage: "",
      id: 0,
      index: "",
    },
  };

  if (objReturnData.status.status) {
    if (req.body == null) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "Body NULL";
    }
  }

  if (objReturnData.status.status) {
    if (!req.body.token) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! token";
    }
  }

  if (objReturnData.status.status) {
    if (!req.body.jenisproduk) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! jenisproduk";
    }
  }
  if (objReturnData.status.status) {
    if (!req.body.kodeproduk) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! kodeproduk";
    }
  }
  if (objReturnData.status.status) {
    if (!req.body.kuantityproduk) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! kuantityproduk";
    }
  }
  if (objReturnData.status.status) {
    if (!req.body.namaproduk) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! namaproduk";
    }
  }
  if (objReturnData.status.status) {
    if (!req.body.hargabeliproduk) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! hargabeliproduk";
    }
  }
  if (objReturnData.status.status) {
    if (!req.body.hargajualproduk) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! hargajualproduk";
    }
  }

  if (!objReturnData.status.status) res.status(200).send(objReturnData);
  done();
};

export const deleteProductMiddleware = (
  req: FastifyRequest<DeleteProductReqDto>,
  res: FastifyReply,
  done: (err?: FastifyError) => void
) => {
  const objReturnData = {
    status: {
      status: 1,
      code: "0800000",
      errormessage: "",
      id: 0,
      index: "",
    },
  };

  if (objReturnData.status.status) {
    if (req.body == null) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "Body NULL";
    }
  }

  if (objReturnData.status.status) {
    if (!req.body.token) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! token";
    }
  }

  if (objReturnData.status.status) {
    if (!req.body.kodeproduk) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! indexproduk";
    }
  }

  if (!objReturnData.status.status) res.status(200).send(objReturnData);
  done();
};
