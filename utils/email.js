// import nodemailer from "nodemailer";

// /* ------------------ GENERIC EMAIL SENDER ------------------ */
// export const sendEmail = async (to, subject, text, html = null) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `Your App <${process.env.SMTP_USER}>`,
//       to,
//       subject,
//       text,
//       html: html || text,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("📨 Email sent to:", to);

//   } catch (err) {
//     console.error("❌ Email sending error:", err);
//     throw new Error("Failed to send email");
//   }
// };

// /* ------------------ VERIFICATION CODE EMAIL ------------------ */
// // export const sendVerificationCodeEmail = async (email, code) => {
// //   const subject = "Your Verification Code";
// //   const text = `Your verification code is ${code}. It expires in 10 minutes.`;

// //   const html = `
// //     <h2>Your Verification Code</h2>
// //     <p style="font-size:20px; font-weight:bold;">${code}</p>
// //     <p>This code expires in 10 minutes.</p>
// //   `;

// //   await sendEmail(email, subject, text, html);
// // };
// export const sendVerificationCodeEmail = async (email, code) => {
//   const subject = "Your Verification Code";

//   const text = `Your verification code is ${code}. It expires in 10 minutes.`;

//   const html = `
//   <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:20px;">
    
//     <div style="
//       max-width:550px;
//       margin:auto;
//       background:white;
//       border-radius:12px;
//       overflow:hidden;
//       box-shadow:0px 4px 20px rgba(0,0,0,0.08);
//     ">
      
//       <!-- HEADER -->
//       <div style="background:#4CAF50; padding:20px; text-align:center;">
//         <img 
//           src="https://your-logo-url.com/logo.png" 
//           alt="App Logo" 
//           style="height:60px;"
//         />
//       </div>

//       <!-- BODY -->
//       <div style="padding:30px;">
//         <h2 style="text-align:center; color:#333; margin-bottom:10px;">
//           Your Verification Code
//         </h2>

//         <p style="font-size:15px; color:#555; text-align:center;">
//           Use the code below to verify your account.  
//         </p>

//         <div style="
//           background:#f0f7ff;
//           border:1px solid #d3e5ff;
//           padding:18px;
//           border-radius:8px;
//           margin:25px 0;
//           text-align:center;
//         ">
//           <span style="
//             font-size:32px; 
//             font-weight:bold; 
//             letter-spacing:4px; 
//             color:#004aad;
//           ">
//             ${code}
//           </span>
//         </div>

//         <p style="font-size:14px; color:#777; text-align:center;">
//           This code expires in <strong>10 minutes</strong>.  
//           Please do not share it with anyone.
//         </p>
//       </div>

//       <!-- FOOTER -->
//       <div style="
//         background:#f1f1f1;
//         padding:15px;
//         text-align:center;
//         font-size:12px;
//         color:#777;
//       ">
//         © ${new Date().getFullYear()} Your App Name. All rights reserved.
//       </div>

//     </div>

//   </div>
//   `;

//   await sendEmail(email, subject, text, html);
// };

// /* ------------------ INACTIVE USER EMAIL ------------------ */
// // export const sendInactiveUserEmail = async (email, username) => {
// //   const subject = "We Miss You! Come Back to the App ❤️";

// //   const text = `
// // Hi ${username || "there"},
// // We noticed you haven’t been active on the app recently. 
// // We’re constantly improving and adding new features you’ll love.

// // Come back and explore!
// // `;

// //   const html = `
// //     <h2>We Miss You, ${username || "Friend"} ❤️</h2>
// //     <p>It looks like you haven't been active for a while.</p>
// //     <p>We’ve added new helpful features, tips, and tools we think you’ll enjoy.</p>
// //     <p><strong>Come back and check what's new!</strong></p>
// //     <br>
// //     <a 
// //       href="http://localhost:5174/login" 
// //       style="padding:10px 20px; background:#4CAF50; color:white; 
// //              text-decoration:none; border-radius:5px;">
// //       Open the App
// //     </a>
// //     <br><br>
// //     <p>See you soon!</p>
// //   `;

// //   await sendEmail(email, subject, text, html);
// // };
// export const sendInactiveUserEmail = async (email, username) => {
//   const subject = "We Miss You! Come Back to the App ❤️";

//   const text = `
// Hi ${username || "there"},
// We noticed you haven’t been active recently. 
// We’ve added new helpful features, tips, and tools we think you’ll enjoy.

// Come back and explore!
// `;



// const html=
// `<!DOCTYPE html>
// <html>
//   <body style="margin:0; padding:0; background-color:#f5f5f5; font-family:Arial, sans-serif;">
//     <table width="100%" border="0" cellspacing="0" cellpadding="0" 
//       style="background-color:#f5f5f5; padding: 30px 0;">

//       <tr>
//         <td align="center">

//           <!-- Main container -->
//           <table width="600" border="0" cellspacing="0" cellpadding="0"
//             style="background:#ffffff; border-radius:8px; overflow:hidden;">

//             <!-- Header with Logo -->
//             <tr>
//               <td align="center" 
//                 style="padding:20px; background:#fefcf4;">
//                 <img src="https://res.cloudinary.com/dqcimdgce/image/upload/v1764434864/mylogo_JANEEN_isd8sf.png" 
//                   alt="Janeen Logo"
//                   style="width:120px; height:auto; display:block;">
//               </td>
//             </tr>

//             <!-- Content box -->
//             <tr>
//               <td style="padding: 30px;">

//                 <h2 style="color:#333333; margin:0 0 10px; font-size:22px;">
//                   We Miss You at Janeen!
//                 </h2>

//                 <p style="color:#555555; font-size:15px; line-height:22px; margin:0 0 15px;">
//                    <strong>Greetings</strong>,
//                 </p>

//                 <p style="color:#555555; font-size:15px; line-height:22px; margin:0 0 20px;">
//                   It's been a while since you last visited Janeen. We’ve introduced new updates,
//                   improvements, and helpful parenting tools we don’t want you to miss!
//                 </p>

//                 <h3 style="color:#333333; font-size:18px; margin:0 0 12px;">
//                   Here’s What’s New:
//                 </h3>

//                 <ul style="font-size:15px; color:#555555; padding-left:20px; margin:0 0 20px;">
//                   <li>New health and parenting content for families</li>
//                   <li>Improved user experience in the app</li>
//                   <li>Helpful reminders and notifications</li>
//                   <li>Janeen AI Chatbot (coming soon!)</li>
//                 </ul>

//                 <!-- CTA Button -->
//                 <div style="text-align:center; margin: 30px 0;">
//                   <a href="http://localhost:5173/login" 
//                     style="
//                       background:#4CAF50;
//                       color:#ffffff;
//                       padding:12px 25px;
//                       font-size:16px;
//                       border-radius:6px;
//                       text-decoration:none;
//                       display:inline-block;
//                     ">
//                     Open Janeen App
//                   </a>
//                 </div>

//                 <p style="color:#777777; font-size:13px; line-height:20px; margin-top:25px;">
//                   Thank you for being a part of the Janeen community.  
//                   We’re excited to have you back!
//                 </p>

//                 <p style="color:#333333; font-size:14px; font-weight:bold; margin-top:20px;">
//                   — The Janeen Team
//                 </p>

//               </td>
//             </tr>

//             <!-- Footer -->
//             <tr>
//               <td align="center"
//                 style="padding:15px; background:#f0f0f0; color:#888888;
//                 font-size:12px;">
//                 © 2025 Janeen. All rights reserved.
//               </td>
//             </tr>

//           </table>
//         </td>
//       </tr>

//     </table>
//   </body>
// </html>
// `
//   await sendEmail(email, subject, text, html);

// };
//...............brevo used fro only for sending email verification code and inactive user email. to free server

/* ------------------ GENERIC EMAIL SENDER (Brevo HTTP API) ------------------ */
export const sendEmail = async (to, subject, text, html = null) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: process.env.EMAIL_FROM_NAME || "Janeen App",
          email: process.env.EMAIL_FROM, // must be the address you verified as a Sender in Brevo
        },
        to: [{ email: to }],
        subject,
        textContent: text,
        htmlContent: html || text,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Email sending error:", data);
      throw new Error("Failed to send email");
    }

    console.log("📨 Email sent to:", to, "| id:", data?.messageId);
  } catch (err) {
    console.error("❌ Email sending error:", err);
    throw new Error("Failed to send email");
  }
};

/* ------------------ VERIFICATION CODE EMAIL ------------------ */
export const sendVerificationCodeEmail = async (email, code) => {
  const subject = "Your Verification Code";

  const text = `Your verification code is ${code}. It expires in 10 minutes.`;

  const html = `
  <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:20px;">
    
    <div style="
      max-width:550px;
      margin:auto;
      background:white;
      border-radius:12px;
      overflow:hidden;
      box-shadow:0px 4px 20px rgba(0,0,0,0.08);
    ">
      
      <!-- HEADER -->
      <div style="background:#4CAF50; padding:20px; text-align:center;">
        <img 
          src="https://your-logo-url.com/logo.png" 
          alt="App Logo" 
          style="height:60px;"
        />
      </div>

      <!-- BODY -->
      <div style="padding:30px;">
        <h2 style="text-align:center; color:#333; margin-bottom:10px;">
          Your Verification Code
        </h2>

        <p style="font-size:15px; color:#555; text-align:center;">
          Use the code below to verify your account.  
        </p>

        <div style="
          background:#f0f7ff;
          border:1px solid #d3e5ff;
          padding:18px;
          border-radius:8px;
          margin:25px 0;
          text-align:center;
        ">
          <span style="
            font-size:32px; 
            font-weight:bold; 
            letter-spacing:4px; 
            color:#004aad;
          ">
            ${code}
          </span>
        </div>

        <p style="font-size:14px; color:#777; text-align:center;">
          This code expires in <strong>10 minutes</strong>.  
          Please do not share it with anyone.
        </p>
      </div>

      <!-- FOOTER -->
      <div style="
        background:#f1f1f1;
        padding:15px;
        text-align:center;
        font-size:12px;
        color:#777;
      ">
        © ${new Date().getFullYear()} Your App Name. All rights reserved.
      </div>

    </div>

  </div>
  `;

  await sendEmail(email, subject, text, html);
};

/* ------------------ INACTIVE USER EMAIL ------------------ */
export const sendInactiveUserEmail = async (email, username) => {
  const subject = "We Miss You! Come Back to the App ❤️";

  const text = `
Hi ${username || "there"},
We noticed you haven’t been active recently. 
We’ve added new helpful features, tips, and tools we think you’ll enjoy.

Come back and explore!
`;

  const html =
    `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f5f5f5; font-family:Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
      style="background-color:#f5f5f5; padding: 30px 0;">

      <tr>
        <td align="center">

          <!-- Main container -->
          <table width="600" border="0" cellspacing="0" cellpadding="0"
            style="background:#ffffff; border-radius:8px; overflow:hidden;">

            <!-- Header with Logo -->
            <tr>
              <td align="center" 
                style="padding:20px; background:#fefcf4;">
                <img src="https://res.cloudinary.com/dqcimdgce/image/upload/v1764434864/mylogo_JANEEN_isd8sf.png" 
                  alt="Janeen Logo"
                  style="width:120px; height:auto; display:block;">
              </td>
            </tr>

            <!-- Content box -->
            <tr>
              <td style="padding: 30px;">

                <h2 style="color:#333333; margin:0 0 10px; font-size:22px;">
                  We Miss You at Janeen!
                </h2>

                <p style="color:#555555; font-size:15px; line-height:22px; margin:0 0 15px;">
                   <strong>Greetings</strong>,
                </p>

                <p style="color:#555555; font-size:15px; line-height:22px; margin:0 0 20px;">
                  It's been a while since you last visited Janeen. We’ve introduced new updates,
                  improvements, and helpful parenting tools we don’t want you to miss!
                </p>

                <h3 style="color:#333333; font-size:18px; margin:0 0 12px;">
                  Here’s What’s New:
                </h3>

                <ul style="font-size:15px; color:#555555; padding-left:20px; margin:0 0 20px;">
                  <li>New health and parenting content for families</li>
                  <li>Improved user experience in the app</li>
                  <li>Helpful reminders and notifications</li>
                  <li>Janeen AI Chatbot (coming soon!)</li>
                </ul>

                <!-- CTA Button -->
                <div style="text-align:center; margin: 30px 0;">
                  <a href="http://localhost:5173/login" 
                    style="
                      background:#4CAF50;
                      color:#ffffff;
                      padding:12px 25px;
                      font-size:16px;
                      border-radius:6px;
                      text-decoration:none;
                      display:inline-block;
                    ">
                    Open Janeen App
                  </a>
                </div>

                <p style="color:#777777; font-size:13px; line-height:20px; margin-top:25px;">
                  Thank you for being a part of the Janeen community.  
                  We’re excited to have you back!
                </p>

                <p style="color:#333333; font-size:14px; font-weight:bold; margin-top:20px;">
                  — The Janeen Team
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center"
                style="padding:15px; background:#f0f0f0; color:#888888;
                font-size:12px;">
                © 2025 Janeen. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>

    </table>
  </body>
</html>
`;
  await sendEmail(email, subject, text, html);
};