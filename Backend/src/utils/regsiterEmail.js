export const RegisterMail = ({ verifyToken, verificationLink }) => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - Amanova AI</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f7fa;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .header {
            background-color: #4f46e5;
            padding: 40px 20px;
            text-align: center;
        }

        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
        }

        .content {
            padding: 40px 30px;
            text-align: center;
        }

        .content h2 {
            color: #1f2937;
            font-size: 24px;
            margin-bottom: 12px;
        }

        .content p {
            color: #6b7280;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 24px;
        }

        .token-box {
            background-color: #f3f4f6;
            padding: 20px;
            border-radius: 8px;
            margin: 24px 0;
            display: inline-block;
        }

        .token-text {
            font-size: 28px;
            font-weight: 700;
            color: #4f46e5;
            letter-spacing: 4px;
            text-transform: uppercase;
        }

        .link-button {
            display: inline-block;
            background-color: #4f46e5;
            color: #ffffff;
            padding: 14px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 16px;
            font-weight: 600;
            transition: background-color 0.2s;
        }

        .link-button:hover {
            background-color: #4338ca;
        }

        .link-text {
            color: #4f46e5;
            text-decoration: none;
            font-weight: 600;
            margin-top: 20px;
            display: block;
        }

        .footer {
            background-color: #f5f7fa;
            padding: 24px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }

        .footer p {
            margin: 0;
            font-size: 14px;
            color: #9ca3af;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Amanova AI</h1>
        </div>

        <div class="content">
            <h2>Verify Your Email Address</h2>
            <p>Thank you for joining Amanova AI! Please verify your email address to complete your registration and get
                started.</p>

            <div class="token-box">
                <div class="token-text">${verifyToken}</div>
            </div>

            <p>Click the button below to verify your email:</p>
            <a href="${verificationLink}" class="link-button">Verify Email</a>

            <p style="margin-top: 24px;">Or, copy and paste this link into your browser:</p>
            <a href="${verificationLink}" class="link-text">${verificationLink}</a>

            <p style="margin-top: 24px;">If you didn't create this account, please ignore this email.</p>
        </div>

        <div class="footer">
            <p>© ${new Date().getFullYear()} Amanova AI. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
`;
};
