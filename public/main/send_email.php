<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$name = htmlspecialchars($_POST['fullName']);
	$email = htmlspecialchars($_POST['email']);
	$phone = htmlspecialchars($_POST['phoneNumber']);
	$message = nl2br(htmlspecialchars($_POST['message']));

	$to = "raphael.v.zimmer@gmail.com";
	$subject = "Contact Form Submission";

	// HTML email body
	$body = "
	<html>
	<head>
		<style>
			body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
			.email-container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background: #f9f9f9; }
			.header { font-size: 18px; font-weight: bold; color: #007BFF; text-align: center; }
			.content { margin-top: 20px; }
			.footer { margin-top: 20px; font-size: 12px; color: #555; text-align: center; }
		</style>
	</head>
	<body>
		<div class='email-container'>
			<div class='header'>New Contact Form Submission</div>
			<div class='content'>
				<p><strong>Name:</strong> $name</p>
				<p><strong>Email:</strong> $email</p>
				<p><strong>Phone:</strong> $phone</p>
				<p><strong>Message:</strong></p>
				<p>$message</p>
			</div>
			<div class='footer'>This message was sent from your website contact form.</div>
		</div>
	</body>
	</html>
	";

	// Email headers
	$headers = "From: dev.geongroup.de\r\n";
	$headers .= "Reply-To: $email\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

	// Send email
	if (mail($to, $subject, $body, $headers)) {
		echo "Thank you! Your message has been sent.";
	} else {
		echo "Oops! Something went wrong, please try again.";
	}
} else {
	echo "Invalid request.";
}
?>
