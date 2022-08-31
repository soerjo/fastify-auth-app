import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { SignupReqDto } from "./dto/signup.dto";

interface ObjectReturnData {
  status: {
    status: number;
    code: string;
    errormessage: string;
    id: number;
    index: string;
  };
  result?: Object;
}

export const signupMiddleware = (
  req: FastifyRequest<SignupReqDto>,
  res: FastifyReply,
  done: (err?: FastifyError) => void
) => {
  console.log("execute Middelware");
  let objReturnData: ObjectReturnData = {
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

  let username = "";
  if (objReturnData.status.status) {
    if (!req.body.username) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! username";
    } else {
      username = req.body.username;
    }
  }

  let password = "";
  if (objReturnData.status.status) {
    if (!req.body.password) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! password";
    } else {
      password = req.body.password;
    }
  }

  let fullname = "";
  if (objReturnData.status.status) {
    if (!req.body.fullname) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! fullname";
    } else {
      fullname = req.body.fullname;
    }
  }

  let email = "";
  if (objReturnData.status.status) {
    if (!req.body.email) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! email";
    } else {
      email = req.body.email;
    }
  }

  if (!objReturnData.status.status) res.status(200).send(objReturnData);

  done();
};
