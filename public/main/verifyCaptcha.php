<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/upload') {
    // Retrieve the reCAPTCHA response from the POST data
    $recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';
    
    // Your reCAPTCHA secret key
    $secretKey = '6LeD9pQqAAAAAM2WLYfCM2GmuOoSkeOZFE9Zp5b-';
    
    // Prepare the POST data for verification
    $verifyData = http_build_query([
        'secret' => $secretKey,
        'response' => $recaptchaResponse,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ]);

    // Initialize cURL to send verification request
    $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $verifyData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute the request and get the response
    $response = curl_exec($ch);
    curl_close($ch);

    // Decode the JSON response
    $responseData = json_decode($response, true);

    // Check if reCAPTCHA verification was successful
    header('Content-Type: application/json');
    if (isset($responseData['success']) && $responseData['success'] === true) {
        echo json_encode(['captchaSuccess' => true]);
    } else {
        echo json_encode(['captchaSuccess' => false]);
    }
    exit;
}