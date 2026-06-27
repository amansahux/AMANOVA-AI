export const RegisterMail = ({ verifyToken, verificationLink }) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{
background:#f3f6fb;
font-family:Inter,Segoe UI,Arial,sans-serif;
padding:40px 15px;
}

.wrapper{
max-width:620px;
margin:auto;
}

.card{

background:#ffffff;
border-radius:24px;
overflow:hidden;

box-shadow:
0 15px 45px rgba(0,0,0,.08);

}

.header{

background:linear-gradient(135deg,#6366f1,#8b5cf6);

padding:60px 30px;
text-align:center;

}

.logo{

font-size:34px;
font-weight:800;
color:white;
letter-spacing:1px;

}

.tag{

margin-top:12px;
color:#ede9fe;
font-size:15px;

}

.content{

padding:50px 40px;

}

h2{

color:#111827;
font-size:30px;
margin-bottom:15px;

}

p{

font-size:16px;
line-height:1.8;
color:#6b7280;

}

.codeBox{

margin:40px auto;
padding:22px;
background:#eef2ff;
border:2px dashed #6366f1;
border-radius:16px;
text-align:center;

}

.code{

font-size:34px;
font-weight:800;
letter-spacing:8px;
color:#4f46e5;

}

.button{

display:inline-block;
margin-top:35px;
padding:16px 40px;

background:linear-gradient(135deg,#6366f1,#8b5cf6);

color:white !important;
text-decoration:none;
font-size:17px;
font-weight:700;

border-radius:14px;

}

.small{

margin-top:35px;
font-size:14px;
color:#9ca3af;

word-break:break-all;

}

.link{

color:#4f46e5;
text-decoration:none;
font-weight:600;

}

.footer{

padding:30px;

background:#111827;

text-align:center;

}

.footer p{

color:#d1d5db;
font-size:14px;

}

.social{

margin-top:15px;

font-size:13px;
color:#9ca3af;

}

</style>

</head>

<body>

<div class="wrapper">

<div class="card">

<div class="header">

<div class="logo">
🤖 Amanova AI
</div>

<div class="tag">
Smart • Fast • Secure
</div>

</div>

<div class="content">

<h2>Verify your email</h2>

<p>

Welcome to <b>Amanova AI</b> 🎉

We're excited to have you onboard.

Use the verification code below or simply click the button to activate your account.

</p>

<div class="codeBox">

<div class="code">
${verifyToken}
</div>

</div>

<center>

<a href="${verificationLink}" class="button">
Verify Email →
</a>

</center>

<p class="small">

If the button doesn't work, copy this URL into your browser:

<br><br>

<a class="link" href="${verificationLink}">
${verificationLink}
</a>

</p>

<p class="small">

This verification link will expire shortly for your security.

If you didn't create an account, you can safely ignore this email.

</p>

</div>

<div class="footer">

<p>

© ${new Date().getFullYear()} Amanova AI

</p>

<div class="social">

Made with ❤️ for developers

</div>

</div>

</div>

</div>

</body>

</html>
`;
};