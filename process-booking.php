<?php
header('Content-Type: application/json');

// Get the JSON data from the request
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name']) || !isset($data['type'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// For WhatsApp bookings, just validate and return success
// The actual WhatsApp redirect happens on the client side
if ($data['type'] === 'whatsapp') {
    // Optional: You could save booking to a database here
    echo json_encode(['success' => true, 'message' => 'Booking prepared for WhatsApp']);
} else {
    echo json_encode(['success' => false, 'message' => 'Unknown booking type']);
}
?>