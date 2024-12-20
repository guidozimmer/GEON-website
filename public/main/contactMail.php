<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['fullName']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phoneNumber']);
    $locations = json_decode($_POST['locations'], true);

    // Build the message
    $message = "Neue Flächenanfrage:\n\n";
    $message .= "Eigentümer: " . ($_POST['isOwner'] ?? 'Nicht angegeben') . "\n";
    $message .= "Flächenart: " . ($_POST['landType'] ?? 'Nicht angegeben') . "\n";
    $message .= "An Autobahn/Bahnstrecke: " . ($_POST['nearHighway'] ?? 'Nicht angegeben') . "\n";
    $message .= "Anteil im Korridor: " . ($_POST['highwayPercentage'] ?? 'Nicht angegeben') . "%\n";
    $message .= "Gesamtfläche: " . ($_POST['areaSize'] ?? 'Nicht angegeben') . " ha\n";
    $message .= "Zusammenhängend: " . ($_POST['isContiguous'] ?? 'Nicht angegeben') . "\n";
    $message .= "Teilflächen: " . ($_POST['subAreas'] ?? 'Nicht angegeben') . "\n";
    $message .= "Verpachtet: " . ($_POST['isLeased'] ?? 'Nicht angegeben') . "\n";
    $message .= "Pachtende: " . ($_POST['leaseEnd'] ?? 'Nicht angegeben') . "\n\n";

    // Add locations information
    $message .= "Standorte:\n";
    foreach ($locations as $index => $location) {
        $message .= "\nStandort " . ($index + 1) . ":\n";
        $message .= "Bundesland: " . $location['bundesland'] . "\n";
        $message .= "Landkreis: " . $location['landkreis'] . "\n";
        $message .= "Gemarkung: " . $location['gemarkung'] . "\n";
        $message .= "Flur: " . $location['flur'] . "\n";
        $message .= "Flurstück: " . $location['flurstueck'] . "\n";
        $message .= "Fläche: " . $location['flaeche'] . " ha\n";
        $message .= "Amt: " . $location['amt'] . "\n";
    }

    $to = "raphael.v.zimmer@gmail.com";
    $subject = "Neue Flächenanfrage von $name";
    $headers = "From: dev.geongroup.de\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
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