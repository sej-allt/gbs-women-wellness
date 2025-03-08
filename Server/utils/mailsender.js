import dotenv from "dotenv";

import nodemailer from "nodemailer";

dotenv.config({
  path: "./.env",
});

export const mailsender = async (email, title, body) => {
  //creating transport
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: "WELLTH CORP",
    to: `${email}`,
    subject: `${title}`,
    html: `${body}`,
  });
};
