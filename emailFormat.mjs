export const emailFormat=(otp)=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        body {
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #f0f2f5;
            color: #2c3e50;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 30px;
        }
        .header img {
            max-width: 120px;
            height: 120px;
            margin-bottom: 10px;
            border-radius: 50%;
        }
        .header h1 {
            font-size: 26px;
            color: #1d72b8;
            margin: 0;
            font-weight: 600;
        }
        .message {
            font-size: 16px;
            line-height: 1.7;
            margin-bottom: 20px;
            color: #34495e;
        }
        .otp-code {
            font-size: 40px;
            font-weight: 600;
            color: #e74c3c;
            text-align: center;
            letter-spacing: 8px;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            background-color: #1d72b8;
            color: #ffffff;
            text-align: center;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
            margin: 20px 0;
            font-weight: 600;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #155a8a;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #7f8c8d;
            margin-top: 40px;
            border-top: 1px solid #ecf0f1;
            padding-top: 20px;
        }
        .footer a {
            color: #1d72b8;
            text-decoration: none;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://github.com/user-attachments/assets/164e4f81-90e5-49c3-a96e-e9d8e333917a" alt="DevToolsB Logo">
            <h1>DevToolsB</h1>
        </div>
        <p class="message">Hello,</p>
        <p class="message">
            You requested a one-time password (OTP) to complete your sign-in process. Your OTP is:
        </p>
        <div class="otp-code">${otp}</div>
        <p class="message">
            Please enter this code within the next 5 minutes to verify your identity. If you did not request this, please contact our support team immediately.
        </p>
        <a href="#" class="button">Go to DevToolsB</a>
        <p class="message">
            Thank you for using DevToolsB. We are committed to keeping your account secure.
        </p>
        <div class="footer">
            &copy; 2024 DevToolsB, Inc. All rights reserved. <br>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </div>
    </div>
</body>
</html>`
}