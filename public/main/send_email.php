<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['FullName']);
    $email = htmlspecialchars($_POST['Email']);
    $phone = htmlspecialchars($_POST['PhoneNumber']); // Phone number field
    $message = nl2br(htmlspecialchars($_POST['message'])); // Convert newlines to <br> for HTML emails

    $to = "raphael.v.zimmer@gmail.com";
    $subject = "Contact Form Submission";

    // HTML email body
    $body = "
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f9f9f9;
                padding: 20px;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background-color: #ffffff;
            }
            .header {
                font-size: 20px;
                font-weight: bold;
                color: #007BFF;
                margin-bottom: 20px;
                text-align: center;
            }
            .details {
                margin-bottom: 15px;
            }
            .details p {
                margin: 5px 0;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                text-align: center;
                color: #555;
            }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <div class='header'>New Contact Form Submission</div>
            <div class='details'>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Email:</strong> $email</p>
                <p><strong>Phone Number:</strong> $phone</p>
                <p><strong>Message:</strong></p>
                <p>$message</p>
            </div>
            <div class='footer'>
                This message was sent from your website contact form.
            </div>
        </div>
    </body>
    </html>
    ";

    // Email headers
    $headers = "From: dev.geongroup.de\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Oops! Something went wrong, please try again.";
    }
} else {
    echo "Invalid request.";
}
?>
