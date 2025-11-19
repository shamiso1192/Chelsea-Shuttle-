<?php
header('Content-Type: application/json');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Get the JSON data from the request
$data = json_decode(file_get_contents('php://input'), true);

// Validate the data
if (!isset($data['name']) || !isset($data['email']) || !isset($data['phone'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// Extract form data
$name = htmlspecialchars($data['name']);
$email = htmlspecialchars($data['email']);
$phone = htmlspecialchars($data['phone']);
$passengers = htmlspecialchars($data['passengers']);
$route = htmlspecialchars($data['route']);
$date = htmlspecialchars($data['date']);

$to = 'chelseashuttles@gmail.com';
$customerEmail = $email;
$subject = 'New Booking Request from ' . $name;

// Email body for Chelsea Shuttles
$message = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { background-color: #f5f5f5; padding: 20px; border-radius: 8px; }
        .header { background-color: #0a4d68; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background-color: white; padding: 20px; }
        .detail { margin: 10px 0; }
        .label { font-weight: bold; color: #0a4d68; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Booking Request</h2>
        </div>
        <div class='content'>
            <div class='detail'><span class='label'>Name:</span> $name</div>
            <div class='detail'><span class='label'>Email:</span> $email</div>
            <div class='detail'><span class='label'>Phone:</span> $phone</div>
            <div class='detail'><span class='label'>Number of Passengers:</span> $passengers</div>
            <div class='detail'><span class='label'>Route:</span> $route</div>
            <div class='detail'><span class='label'>Preferred Date:</span> $date</div>
            <hr>
            <p><strong>Please contact the customer to confirm the booking.</strong></p>
        </div>
    </div>
</body>
</html>
";

// Email headers
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: noreply@chelseashuttles.co.za\r\n";

// Send email to Chelsea Shuttles
$sentToAdmin = mail($to, $subject, $message, $headers);

// Send confirmation email to customer
$customerSubject = 'Booking Request Received - Chelsea Shuttles';
$customerMessage = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { background-color: #f5f5f5; padding: 20px; border-radius: 8px; }
        .header { background-color: #198754; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background-color: white; padding: 20px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Your Booking Request Has Been Received</h2>
        </div>
        <div class='content'>
            <p>Hi $name,</p>
            <p>Thank you for booking with Chelsea Shuttles! We have received your booking request.</p>
            <p><strong>Booking Details:</strong></p>
            <ul>
                <li>Route: $route</li>
                <li>Number of Passengers: $passengers</li>
                <li>Preferred Date: $date</li>
            </ul>
            <p>Our team will contact you shortly at <strong>$phone</strong> or <strong>$email</strong> to confirm your booking.</p>
            <p>If you have any questions, feel free to reach out to us at <strong>chelseashuttles@gmail.com</strong> or call <strong>0737197959</strong>.</p>
            <p>Safe travels!</p>
            <p><strong>Chelsea Shuttles Team</strong></p>
        </div>
    </div>
</body>
</html>
";

$customerHeaders = "MIME-Version: 1.0\r\n";
$customerHeaders .= "Content-type: text/html; charset=UTF-8\r\n";
$customerHeaders .= "From: noreply@chelseashuttles.co.za\r\n";

$sentToCustomer = mail($customerEmail, $customerSubject, $customerMessage, $customerHeaders);

// Return response
if ($sentToAdmin && $sentToCustomer) {
    echo json_encode(['success' => true, 'message' => 'Booking sent successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
?>
