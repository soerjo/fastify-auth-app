import nodemailer from "nodemailer";
import { mail_config } from "../../configs/config";

export interface SendMailDto {
  reciever: string;
  body: string;
  html?: string;
  subject?: string;
}

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: mail_config.email,
    pass: mail_config.pass,
  },
});

export const sendMail = async (params: SendMailDto) => {
  try {
    await transporter.sendMail({
      from: `"MyApp_Test" <${mail_config.email}>`,
      to: params.reciever,
      subject: params.subject ? params.subject : "Email Confirmation",
      html: `<p>${params.body}</p>`,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
