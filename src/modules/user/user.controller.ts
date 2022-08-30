import { FastifyReply, FastifyRequest } from "fastify";
import { execQuery } from "../../configs/db_mysql";
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

const signup = async (
  req: FastifyRequest<SignupReqDto>,
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

    if (objReturnData.status.status) {
      let response = await execQuery("CALL spsignup(?,?,?,?)", [
        username,
        fullname,
        email,
        password,
      ]);

      objReturnData.status.status = response[0].resultstatus;
      objReturnData.status.code = response[0].resultcode;
      objReturnData.status.errormessage = response[0].resulterrormessage;
      objReturnData.status.id = response[0].resultid;
      objReturnData.status.index = response[0].resultindex;

      if (response.length) objReturnData.result = response[1];
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

  reply.status(200).send(objReturnData);
};

const signin = async (
  req: FastifyRequest<SignupReqDto>,
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

    if (objReturnData.status.status) {
      let response = await execQuery("CALL spsignin(?,?)", [
        username,
        password,
      ]);

      objReturnData.status.status = response[0].resultstatus;
      objReturnData.status.code = response[0].resultcode;
      objReturnData.status.errormessage = response[0].resulterrormessage;
      objReturnData.status.id = response[0].resultid;
      objReturnData.status.index = response[0].resultindex;

      if (response.length) objReturnData.result = response[1];
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

  reply.status(200).send(objReturnData);
};

const forgotPassword = async (
  req: FastifyRequest<SignupReqDto>,
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

    console.log("the data sended: ", { username });
    if (objReturnData.status.status) {
      let response = await execQuery("CALL spforgotpassword(?,?)", [username]);

      console.log("log query: ", response);
      // objReturnData.status.status = response[0].resultstatus;
      // objReturnData.status.code = response[0].resultcode;
      // objReturnData.status.errormessage = response[0].resulterrormessage;
      // objReturnData.status.id = response[0].resultid;
      // objReturnData.status.index = response[0].resultindex;

      // if (response.length) objReturnData.result = response[1];
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

  reply.status(200).send(objReturnData);
};

const resetPassword = async (req: FastifyRequest, rep: FastifyReply) => {
  const body = req.body;
  console.log(body);
  return { response: body };
};

export default { signin, signup, resetPassword, forgotPassword };
