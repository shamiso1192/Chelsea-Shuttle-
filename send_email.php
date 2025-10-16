<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Receiver email
    $to = "chelseashuttles@gmail.com";  
    $subject = "Chelsea Shuttles - New Enquiry/Booking";

    // Sanitize inputs
    $name    = isset($_POST["name"]) ? strip_tags(trim($_POST["name"])) : "N/A";
    $email   = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : "N/A";
    $from    = isset($_POST["from"]) ? strip_tags(trim($_POST["from"])) : "N/A";
    $toTrip  = isset($_POST["to"]) ? strip_tags(trim($_POST["to"])) : "N/A";
    $date    = isset($_POST["date"]) ? strip_tags(trim($_POST["date"])) : "N/A";
    $message = isset($_POST["message"]) ? strip_tags(trim($_POST["message"])) : "No message provided";

    // Build email body
    $email_content  = "📩 New enquiry/booking from Chelsea Shuttles website:\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n\n";

    // If booking form is used, include travel details
    if ($from !== "N/A" && $toTrip !== "N/A") {
        $email_content .= "Travel From: $from\n";
        $email_content .= "Travel To: $toTrip\n";
        $email_content .= "Travel Date: $date\n\n";
    }

    $email_content .= "Message:\n$message\n";

    // Email headers
    $headers  = "From: Chelsea Shuttles Website <no-reply@chelseashuttles.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        echo "<script>alert('✅ Thank you, $name! Your enquiry has been sent. We will respond soon.'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('⚠️ Sorry, something went wrong. Please try again later.'); window.location.href='index.html';</script>";
    }
}
?>