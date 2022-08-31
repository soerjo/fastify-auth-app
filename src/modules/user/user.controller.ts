import { FastifyReply, FastifyRequest } from "fastify";
import { execQuery } from "../../configs/db_mysql";
import { server_config } from "../../configs/config";
import { sendMail } from "../nodemailer/mailing.service";
import { ForgotPasswordReqDto } from "./dto/forgotpassword.dto";
import { ResetPasswordReqDto } from "./dto/resetpassword.dto";
import { SigninReqDto } from "./dto/signin.dto";
import { SignupReqDto } from "./dto/signup.dto";
import { ActivateUserReqDto } from "./dto/activateuser.dto";

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

    if (response.length) {
      const { verificationcode, ...returnresponsedata } = response[1];
      objReturnData.result = returnresponsedata;
      const usernameresponse = response[1].username;
      const useremail = response[1].useremail;
      const bodyEmail = `<p>hi <b>${usernameresponse}</b>, this is your link to activate account:</p><a href="${server_config.server_url}/api/users/activateuser/${verificationcode}">${server_config.server_url}/api/users/activateuser/${verificationcode}</a>`;
      sendMail({
        reciever: useremail,
        body: bodyEmail,
        subject: "Email confirmation",
      });

      objReturnData.result = {
        verificationcode: response[1].verificationcode,
      };
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

  reply.redirect(server_config.client_url);
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

    const verificationcode = response[1].verificationcode;
    const useremail = response[1].useremail;

    const bodyEmail = `<p>this is your link to reset your password:</p><a href="${server_config.client_url}/${verificationcode}">${server_config.client_url}/${verificationcode}</a>`;
    sendMail({
      reciever: useremail,
      body: bodyEmail,
      subject: "Request Change Password",
    });

    objReturnData.result = { verificationcode: response[1].verificationcode };
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

export default { signin, signup, resetPassword, forgotPassword, activateUser };
