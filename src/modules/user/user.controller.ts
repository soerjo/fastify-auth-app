import { FastifyReply, FastifyRequest } from "fastify";
import { execQuery } from "../../configs/db_mysql";

import { SigninReqDto } from "./dto/signin.dto";
import { SignupReqDto } from "./dto/signup.dto";
import { ForgotPasswordReqDto } from "./dto/forgotpassword.dto";
import { ResetPasswordReqDto } from "./dto/resetpassword.dto";
import { ActivateUserReqDto } from "./dto/activateuser.dto";
import { LogoutDto, LogoutReqDto } from "./dto/logout.dto";

import { ObjectReturnData } from "../../common/type/objectResponseData";

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
    let response = await execQuery("CALL spsignup(?,?,?,?)", [
      req.body.username,
      req.body.fullname,
      req.body.email,
      req.body.password,
    ]);

    objReturnData.status.status = response[0].resultstatus;
    objReturnData.status.code = response[0].resultcode;
    objReturnData.status.errormessage = response[0].resulterrormessage;
    objReturnData.status.id = response[0].resultid;
    objReturnData.status.index = response[0].resultindex;

    if (response[0].resultstatus) {
      const { verificationcode } = response[1];

      // const { username: usernameresponse, useremail } = response[1];
      // const bodyEmail = `<p>hi <b>${usernameresponse}</b>, this is your link to activate account:</p><a href="${server_config.server_url}/api/users/activateuser/${verificationcode}">${server_config.server_url}/api/users/activateuser/${verificationcode}</a>`;
      // sendMail({
      //   reciever: useremail,
      //   body: bodyEmail,
      //   subject: "Email confirmation",
      // });

      // For development =============
      // objReturnData.result = { verificationcode };
      // =============================
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

const activateUser = async (
  req: FastifyRequest<ActivateUserReqDto>,
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
    let response = await execQuery("CALL spactivateuser(?)", [
      req.params.token,
    ]);

    objReturnData.status.status = response[0].resultstatus;
    objReturnData.status.code = response[0].resultcode;
    objReturnData.status.errormessage = response[0].resulterrormessage;
    objReturnData.status.id = response[0].resultid;
    objReturnData.status.index = response[0].resultindex;
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
  // Development Mode
  reply.code(200).send({ response: "ok" });

  // reply.redirect(server_config.client_url);
};

const signin = async (
  req: FastifyRequest<SigninReqDto>,
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
    let response = await execQuery("CALL spsignin(?,?)", [
      req.body.username,
      req.body.password,
    ]);

    objReturnData.status.status = response[0].resultstatus;
    objReturnData.status.code = response[0].resultcode;
    objReturnData.status.errormessage = response[0].resulterrormessage;
    objReturnData.status.id = response[0].resultid;
    objReturnData.status.index = response[0].resultindex;

    if (response.length) objReturnData.result = response[1];
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
  req: FastifyRequest<ForgotPasswordReqDto>,
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
    let response = await execQuery("CALL spforgotpassword(?)", [
      req.body.username,
    ]);

    objReturnData.status.status = response[0].resultstatus;
    objReturnData.status.code = response[0].resultcode;
    objReturnData.status.errormessage = response[0].resulterrormessage;
    objReturnData.status.id = response[0].resultid;
    objReturnData.status.index = response[0].resultindex;

    if (response[0].resultstatus) {
      const { verificationcode, useremail } = response[1];

      // const bodyEmail = `<p>this is your link to reset your password:</p><a href="${server_config.client_url}/${verificationcode}">${server_config.client_url}/${verificationcode}</a>`;
      // sendMail({
      //   reciever: useremail,
      //   body: bodyEmail,
      //   subject: "Request Change Password",
      // });

      // For development =============
      objReturnData.result = { verificationcode };
      // =============================
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

const resetPassword = async (
  req: FastifyRequest<ResetPasswordReqDto>,
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
    let response = await execQuery("CALL spresetpassword(?,?)", [
      req.body.verificationcode,
      req.body.newpassword,
    ]);

    objReturnData.status.status = response[0].resultstatus;
    objReturnData.status.code = response[0].resultcode;
    objReturnData.status.errormessage = response[0].resulterrormessage;
    objReturnData.status.id = response[0].resultid;
    objReturnData.status.index = response[0].resultindex;
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

const logout = async (
  req: FastifyRequest<LogoutReqDto>,
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
    let response = await execQuery("CALL splogout(?)", [req.body.token]);

    objReturnData.status.status = response[0].resultstatus;
    objReturnData.status.code = response[0].resultcode;
    objReturnData.status.errormessage = response[0].resulterrormessage;
    objReturnData.status.id = response[0].resultid;
    objReturnData.status.index = response[0].resultindex;
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

export default {
  signin,
  signup,
  resetPassword,
  forgotPassword,
  activateUser,
  logout,
};
