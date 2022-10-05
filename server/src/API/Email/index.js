const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");

// let transporter = nodemailer.createTransport({
//   host: "smtp.sendgrid.net",
//   port: 587,
//   auth: {
//     user: "apikey",
//     pass: "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",
//   },
// });
sgMail.setApiKey(
  "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"
);

const EmailOTP = async (msg) => {
  try {
    console.log({ msg });
    sgMail.send(msg, (err, info) => {
      if (err) {
        throw new Error(err);
      } else {
        return true;
      }
    });
    console.log("Email sent");
  } catch (error) {
    return error;
  }
  // console.log(mail.from + "\n" + mail.to + "\n" + mail.html);
};
const sendMail = async (data) => {
  try {
    const userData = data[0];
    console.log(data);
    const msg = {
      from: "oralpath@sriramachandra.edu.in",
      to: userData.user_email,
      subject: userData.eventName,
      html: `<strong>
        Hi,
      </strong><br />
      <strong>Thanks for registering ${userData.eventName}.</strong><br />
      <strong>Your payment was successfull.</strong><br />
      <strong>Hoping to see you on ${userData.event_start_data}</strong><br />
      <p>you have successfully registred for the event Clinico-Pathological Slide Seminar 2.0</p><br />
      <p>Thank you </p>
      `,
    };
    console.log({ msg });
    sgMail.send(msg, (err, info) => {
      if (err) {
        throw new Error(err);
      } else {
        return true;
      }
    });
    console.log("Email sent");
  } catch (error) {
    return error;
  }
  // console.log(mail.from + "\n" + mail.to + "\n" + mail.html);
};

module.exports = { sendMail, EmailOTP };
