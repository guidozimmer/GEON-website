<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $landType = $_POST['landType'] ?? 'Not specified';
    $nearHighway = $_POST['nearHighway'] ?? 'Not specified';
    $highwayPercentage = $_POST['highwayPercentage'] ?? 'Not specified';
    $areaSize = $_POST['areaSize'] ?? 'Not specified';
    $isContiguous = $_POST['isContiguous'] ?? 'Not specified';
    $subAreas = $_POST['subAreas'] ?? 'Not specified';
    $isLeased = $_POST['isLeased'] ?? 'Not specified';
    $leaseEnd = $_POST['leaseEnd'] ?? 'Not specified';
    $state = $_POST['state'] ?? 'Not specified';
    $district = $_POST['district'] ?? 'Not specified';

    $to = "raphael.v.zimmer@gmail.com";
    $subject = "New Land Offer Submission";

    // HTML email body
    $body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .email-container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background: #f9f9f9; }
            .header { font-size: 18px; font-weight: bold; color: #007BFF; text-align: center; }
            .content { margin-top: 20px; }
            .field { margin-bottom: 10px; }
            .label { font-weight: bold; }
            .footer { margin-top: 20px; font-size: 12px; color: #555; text-align: center; }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <div class='header'>New Land Offer Submission</div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Land Type:</span> $landType
                </div>
                <div class='field'>
                    <span class='label'>Near Highway/Railway:</span> $nearHighway
                </div>
                " . ($nearHighway === 'ja' ? "
                <div class='field'>
                    <span class='label'>Highway Corridor Percentage:</span> {$highwayPercentage}%
                </div>" : "") . "
                <div class='field'>
                    <span class='label'>Area Size:</span> {$areaSize} ha
                </div>
                <div class='field'>
                    <span class='label'>Is Contiguous:</span> $isContiguous
                </div>
                " . ($isContiguous === 'nein' ? "
                <div class='field'>
                    <span class='label'>Number of Sub-areas:</span> $subAreas
                </div>" : "") . "
                <div class='field'>
                    <span class='label'>Is Leased:</span> $isLeased
                </div>
                " . ($isLeased === 'ja' ? "
                <div class='field'>
                    <span class='label'>Lease End Year:</span> $leaseEnd
                </div>" : "") . "
                <div class='field'>
                    <span class='label'>State:</span> $state
                </div>
                <div class='field'>
                    <span class='label'>District:</span> $district
                </div>
            </div>
            <div class='footer'>This submission was sent from your website land offer form.</div>
        </div>
    </body>
    </html>
    ";

    // Email headers
    $headers = "From: dev.geongroup.de\r\n";
    $headers .= "Reply-To: no-reply@geongroup.de\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Success";
    } else {
        http_response_code(500);
        echo "Error sending email";
    }
} else {
    http_response_code(400);
    echo "Invalid request";
}
?>