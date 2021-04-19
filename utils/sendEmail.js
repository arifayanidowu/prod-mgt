const sgMail = require("@sendgrid/mail");

const sendEmail = async (options) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const msg = {
      to: options.email,
      cc: options.cc,
      from: `${process.env.FROM_NAME}<${process.env.FROM_EMAIL}>`,
      subject: options.subject,
      text: options.message,
      template_id: process.env.SENDGRID_TEMPLATE_ID,
      dynamic_template_data: options.dynamic_template_data,
    };
    await sgMail.send(msg);
  } catch (error) {
    console.log(error.response.body);
  }
};

module.exports = sendEmail;
