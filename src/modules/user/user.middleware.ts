import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ActivateUserReqDto } from "./dto/activateuser.dto";
import { ForgotPasswordReqDto } from "./dto/forgotpassword.dto";
import { LogoutReqDto } from "./dto/logout.dto";
import { ResetPasswordReqDto } from "./dto/resetpassword.dto";
import { SigninReqDto } from "./dto/signin.dto";
import { SignupReqDto } from "./dto/signup.dto";

const signupMiddleware = (
  req: FastifyRequest<SignupReqDto>,
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
    if (!req.body.username) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! username";
    }
  }

  if (objReturnData.status.status) {
    if (!req.body.password) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! password";
    }
  }

  if (objReturnData.status.status) {
    if (!req.body.fullname) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! fullname";
    }
  }

  if (objReturnData.status.status) {
    if (!req.body.email) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! email";
    }
  }

  if (!objReturnData.status.status) res.status(200).send(objReturnData);
  done();
};

const activateMiddleware = (
  req: FastifyRequest<ActivateUserReqDto>,
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
    if (!req.params.token) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! verificationcode";
    }
  }

  if (!objReturnData.status.status) res.status(200).send(objReturnData);
  done();
};

const signinMiddleware = (
  req: FastifyRequest<SigninReqDto>,
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
    if (!req.body.username) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! username";
    }
  }

  if (objReturnData.status.status) {
    if (!req.body.password) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! password";
    }
  }

  if (!objReturnData.status.status) res.status(200).send(objReturnData);
  done();
};

const forgotPasswordMiddleware = (
  req: FastifyRequest<ForgotPasswordReqDto>,
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
    if (!req.body.username) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! username";
    }
  }

  if (!objReturnData.status.status) res.status(200).send(objReturnData);
  done();
};

const resetPasswordMiddleware = (
  req: FastifyRequest<ResetPasswordReqDto>,
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
    if (!req.body.verificationcode) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! verificationcode";
    }
  }

  if (objReturnData.status.status) {
    if (!req.body.newpassword) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! newpassword";
    }
  }

  if (!objReturnData.status.status) res.status(200).send(objReturnData);
  done();
};

const logoutMiddleware = (
  req: FastifyRequest<LogoutReqDto>,
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
    if (!req.body.token) {
      objReturnData.status.status = 0;
      objReturnData.status.code = "055555";
      objReturnData.status.errormessage = "! token";
    }
  }

  if (!objReturnData.status.status) res.status(200).send(objReturnData);
  done();
};

export default {
  signupMiddleware,
  signinMiddleware,
  activateMiddleware,
  forgotPasswordMiddleware,
  resetPasswordMiddleware,
  logoutMiddleware,
};
