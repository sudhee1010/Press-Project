import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmployeeWelcomeEmail = async (email, name, password, loginLink) => {
  const msg = {
    to: email,
    from: "yourcompany@example.com", // Must be verified in SendGrid
    subject: "Welcome to the Company!",
    text: `Hi ${name},\n\nWelcome! Your account has been created.\n\nLogin Link: ${loginLink}\nEmail: ${email}\nPassword: ${password}\n\nBest regards,\nCompany Name`,
    html: `
      <p>Hi ${name},</p>
      <p>Welcome! Your account has been created.</p>
      <p><strong>Login Link:</strong> <a href="${loginLink}">${loginLink}</a></p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>Best regards,<br/>Company Name</p>
    `,
  };

  await sgMail.send(msg);
};

export default sendEmployeeWelcomeEmail;
