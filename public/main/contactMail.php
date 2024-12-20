<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['fullName']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phoneNumber']);
    $locations = json_decode($_POST['locations'], true);

    $to = "raphael.v.zimmer@gmail.com";
    $subject = "Neue Flächenanfrage von $name";

    // Create beautiful HTML email
    $body = "
    <html>
    <head>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                line-height: 1.6; 
                color: #333;
                margin: 0;
                padding: 0;
            }
            .email-container { 
                max-width: 800px; 
                margin: 0 auto;
                background: #ffffff;
            }
            .header {
                background-color: #1a5f7a;
                color: white;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }
            .content {
                padding: 30px;
            }
            .section {
                margin-bottom: 30px;
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
            }
            .section-title {
                color: #1a5f7a;
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 2px solid #1a5f7a;
            }
            .info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
            }
            .info-item {
                padding: 8px;
                background: #ffffff;
                border-radius: 4px;
            }
            .info-label {
                font-weight: bold;
                color: #1a5f7a;
            }
            .location-card {
                background: #ffffff;
                border: 1px solid #dee2e6;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
            }
            .location-title {
                font-size: 16px;
                font-weight: bold;
                color: #1a5f7a;
                margin-bottom: 10px;
                padding-bottom: 5px;
                border-bottom: 1px solid #dee2e6;
            }
            .contact-info {
                background: #e9ecef;
                padding: 20px;
                border-radius: 8px;
                margin-top: 20px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                background: #f8f9fa;
                color: #6c757d;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <div class='header'>
                <h1>Neue Flächenanfrage</h1>
            </div>
            
            <div class='content'>
                <div class='section'>
                    <div class='section-title'>Grundinformationen</div>
                    <div class='info-grid'>
                        <div class='info-item'>
                            <span class='info-label'>Ist Eigentümer:</span> " . ($_POST['isOwner'] ?? 'Nicht angegeben') . "
                        </div>
                        <div class='info-item'>
                            <span class='info-label'>Flächenart:</span> " . ($_POST['landType'] ?? 'Nicht angegeben') . "
                        </div>
                        <div class='info-item'>
                            <span class='info-label'>An Autobahn/Bahnstrecke:</span> " . ($_POST['nearHighway'] ?? 'Nicht angegeben') . "
                        </div>
                        <div class='info-item'>
                            <span class='info-label'>Anteil im Korridor:</span> " . ($_POST['highwayPercentage'] ?? 'Nicht angegeben') . "%
                        </div>
                        <div class='info-item'>
                            <span class='info-label'>Gesamtfläche:</span> " . ($_POST['areaSize'] ?? 'Nicht angegeben') . " ha
                        </div>
                        <div class='info-item'>
                            <span class='info-label'>Zusammenhängend:</span> " . ($_POST['isContiguous'] ?? 'Nicht angegeben') . "
                        </div>
                        <div class='info-item'>
                            <span class='info-label'>Teilflächen:</span> " . ($_POST['subAreas'] ?? 'Nicht angegeben') . "
                        </div>
                        <div class='info-item'>
                            <span class='info-label'>Verpachtet:</span> " . ($_POST['isLeased'] ?? 'Nicht angegeben') . "
                        </div>
                        <div class='info-item'>
                            <span class='info-label'>Pachtende:</span> " . ($_POST['leaseEnd'] ?? 'Nicht angegeben') . "
                        </div>
                    </div>
                </div>

                <div class='section'>
                    <div class='section-title'>Standortinformationen</div>";
                    
                    foreach ($locations as $index => $location) {
                        $body .= "
                        <div class='location-card'>
                            <div class='location-title'>Standort " . ($index + 1) . "</div>
                            <div class='info-grid'>
                                <div class='info-item'>
                                    <span class='info-label'>Bundesland:</span> " . htmlspecialchars($location['bundesland']) . "
                                </div>
                                <div class='info-item'>
                                    <span class='info-label'>Landkreis:</span> " . htmlspecialchars($location['landkreis']) . "
                                </div>
                                <div class='info-item'>
                                    <span class='info-label'>Gemarkung:</span> " . htmlspecialchars($location['gemarkung']) . "
                                </div>
                                <div class='info-item'>
                                    <span class='info-label'>Flur:</span> " . htmlspecialchars($location['flur']) . "
                                </div>
                                <div class='info-item'>
                                    <span class='info-label'>Flurstück:</span> " . htmlspecialchars($location['flurstueck']) . "
                                </div>
                                <div class='info-item'>
                                    <span class='info-label'>Fläche:</span> " . htmlspecialchars($location['flaeche']) . " ha
                                </div>
                                <div class='info-item'>
                                    <span class='info-label'>Amt:</span> " . htmlspecialchars($location['amt']) . "
                                </div>
                            </div>
                        </div>";
                    }

                    $body .= "
                </div>

                <div class='contact-info'>
                    <div class='section-title'>Kontaktinformationen</div>
                    <div class='info-grid'>
                        <div class='info-item'>
                            <span class='info-label'>Name:</span> $name
                        </div>
                        <div class='info-item'>
                            <span class='info-label'>Email:</span> $email
                        </div>
                        <div class='info-item'>
                            <span class='info-label'>Telefon:</span> $phone
                        </div>
                    </div>
                </div>
            </div>

            <div class='footer'>
                Diese Nachricht wurde über das Flächenformular auf Ihrer Website gesendet.
            </div>
        </div>
    </body>
    </html>";

    // Email headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: dev.geongroup.de\r\n";
    $headers .= "Reply-To: $email\r\n";

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