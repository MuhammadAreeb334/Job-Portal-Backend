import "dotenv/config";

import sendEmail from "./utils/sendEmail.js";

await sendEmail({
  to: "muhammadareeb334@gmail.com",
  subject: "Job Portal Test",
  html: `
    <h2>Email Working</h2>
    <p>If you received this email, Nodemailer is configured correctly.</p>
  `,
});

console.log("Email Sent Successfully");
