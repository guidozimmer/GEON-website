<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $isOwner = $_POST['isOwner'];
    $landType = $_POST['landType'];
    $nearHighway = $_POST['nearHighway'];
    $highwayPercentage = $_POST['highwayPercentage'] ?? 'N/A';
    $areaSize = $_POST['areaSize'];
    $isContiguous = $_POST['isContiguous'];
    $subAreas = $_POST['subAreas'] ?? 'N/A';
    $isLeased = $_POST['isLeased'];
    $leaseEnd = $_POST['leaseEnd'] ?? 'N/A';
    
    // Get contact information
    $name = htmlspecialchars($_POST['contact']['name']);
    $email = htmlspecialchars($_POST['contact']['email']);
    $phone = htmlspecialchars($_POST['contact']['phone']);

    // Process locations array
    $locations = $_POST['locations'];
    $locationsHtml = "";
    
    foreach ($locations as $index => $location) {
        $locationsHtml .= "
            <div style='margin-bottom: 20px; padding: 10px; background: #f0f0f0; border-radius: 5px;'>
                <h3>Location " . ($index + 1) . "</h3>
                <p><strong>Bundesland:</strong> " . htmlspecialchars($location['bundesland']) . "</p>
                <p><strong>Landkreis:</strong> " . htmlspecialchars($location['landkreis']) . "</p>
                <p><strong>Gemarkung:</strong> " . htmlspecialchars($location['gemarkung']) . "</p>
                <p><strong>Flur:</strong> " . htmlspecialchars($location['flur']) . "</p>
                <p><strong>Flurstück:</strong> " . htmlspecialchars($location['flurstueck']) . "</p>
                <p><strong>Fläche in ha:</strong> " . htmlspecialchars($location['flaeche']) . "</p>
                <p><strong>Amt:</strong> " . htmlspecialchars($location['amt']) . "</p>
            </div>";
    }

    $to = "raphael.v.zimmer@gmail.com";
    $subject = "Neue Flächenanfrage";

    // HTML email body
    $body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .email-container { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background: #f9f9f9; }
            .header { font-size: 18px; font-weight: bold; color: #007BFF; text-align: center; margin-bottom: 20px; }
            .content { margin-top: 20px; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 16px; font-weight: bold; margin-bottom: 10px; }
            .locations { margin-top: 20px; }
            .footer { margin-top: 20px; font-size: 12px; color: #555; text-align: center; }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <div class='header'>Neue Flächenanfrage</div>
            <div class='content'>
                <div class='section'>
                    <div class='section-title'>Grundinformationen</div>
                    <p><strong>Ist Eigentümer:</strong> $isOwner</p>
                    <p><strong>Flächenart:</strong> $landType</p>
                    <p><strong>An Autobahn/Bahnstrecke:</strong> $nearHighway</p>
                    <p><strong>Anteil im 500m Korridor:</strong> $highwayPercentage</p>
                    <p><strong>Gesamtfläche:</strong> $areaSize ha</p>
                    <p><strong>Zusammenhängend:</strong> $isContiguous</p>
                    <p><strong>Anzahl Teilflächen:</strong> $subAreas</p>
                    <p><strong>Verpachtet:</strong> $isLeased</p>
                    <p><strong>Pachtende:</strong> $leaseEnd</p>
                </div>

                <div class='section'>
                    <div class='section-title'>Standorte</div>
                    <div class='locations'>
                        $locationsHtml
                    </div>
                </div>

                <div class='section'>
                    <div class='section-title'>Kontaktinformationen</div>
                    <p><strong>Name:</strong> $name</p>
                    <p><strong>Email:</strong> $email</p>
                    <p><strong>Telefon:</strong> $phone</p>
                </div>
            </div>
            <div class='footer'>Diese Anfrage wurde über das Flächenformular gesendet.</div>
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
        echo "Success";
    } else {
        http_response_code(500);
        echo "Error sending email";
    }
} else {
    http_response_code(400);
    echo "Invalid request";
}