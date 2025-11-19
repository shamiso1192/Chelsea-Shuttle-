// Modal elements
const bookBtn = document.getElementById("bookBtn")
const ctaBtn = document.getElementById("ctaBtn")
const bookingModal = document.getElementById("bookingModal")
const closeBtn = document.querySelector(".close")
const bookingForm = document.getElementById("bookingForm")
const whatsappSubmit = document.getElementById("whatsappSubmit")
const emailSubmit = document.getElementById("emailSubmit")

console.log("[v0] Initializing - Modal:", bookingModal, "Book Btn:", bookBtn, "CTA Btn:", ctaBtn)

// Open modal
function openModal() {
  console.log("[v0] Opening modal")
  if (bookingModal) {
    bookingModal.style.display = "block"
    console.log("[v0] Modal display set to: block")
  } else {
    console.log("[v0] ERROR: Modal element not found!")
  }
}

bookBtn.addEventListener("click", openModal)
ctaBtn.addEventListener("click", openModal)

// Close modal
function closeModal() {
  console.log("[v0] Closing modal")
  if (bookingModal) {
    bookingModal.style.display = "none"
  }
}

closeBtn.addEventListener("click", closeModal)

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === bookingModal) {
    closeModal()
  }
})

// Handle WhatsApp submission with AJAX
whatsappSubmit.addEventListener("click", (e) => {
  e.preventDefault()
  
  console.log("[v0] WhatsApp button clicked")
  
  if (bookingForm.checkValidity() === false) {
    console.log("[v0] Form validation failed")
    bookingForm.classList.add("was-validated")
    return
  }

  console.log("[v0] Form validation passed, collecting data...")
  
  const whatsappMessage = `*New Booking Request*%0A%0ARoute: ${selectedRoute}%0AName: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0ADate: ${formData.date}%0APassengers: ${formData.passengers}%0AMessage: ${formData.message}`

    // Open WhatsApp
    window.open(`https://wa.me/27737197959?text=${whatsappMessage}`, "_blank")


  // Collect form data
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const phone = document.getElementById("phone").value
  const passengers = document.getElementById("passengers").value
  const route = document.getElementById("route").value
  const date = document.getElementById("date").value

  console.log("[v0] Form data collected:", {name, email, phone, passengers, route, date})

  // Format message for WhatsApp
  const message = `Booking Request:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPassengers: ${passengers}\nRoute: ${route}\nDate: ${date}`
  const encodedMessage = encodeURIComponent(message)
  const whatsappURL = `https://wa.me/27737197959?text=${encodedMessage}`

  console.log("[v0] Opening WhatsApp URL...")
  
  // Show success message
  const responseDiv = document.getElementById("responseMessage")
  responseDiv.style.display = "block"
  responseDiv.className = "response-message success"
  responseDiv.innerHTML = "✓ Opening WhatsApp... Please complete your booking"

  // Open WhatsApp in new window
  window.open(whatsappURL, "_blank")
  
  // Reset form and close modal after delay
  setTimeout(() => {
    closeModal()
    bookingForm.reset()
    responseDiv.style.display = "none"
    whatsappSubmit.textContent = originalText
    whatsappSubmit.disabled = false
  }, 1500)
})

// Handle Email submission directly
emailSubmit.addEventListener("click", (e) => {
  e.preventDefault()

  console.log("[v0] Email button clicked")

  if (bookingForm.checkValidity() === false) {
    console.log("[v0] Form validation failed")
    bookingForm.classList.add("was-validated")
    return
  }

  console.log("[v0] Form validation passed")

  const originalText = emailSubmit.textContent
  emailSubmit.textContent = "Sending..."
  emailSubmit.disabled = true

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const phone = document.getElementById("phone").value
  const passengers = document.getElementById("passengers").value
  const route = document.getElementById("route").value
  const date = document.getElementById("date").value

  console.log("[v0] Attempting email submission...", {name, email, phone, passengers, route, date})

  // Create mailto link with pre-filled subject and body
  const mailtoLink = `mailto:chelseashuttles@gmail.com?subject=Booking Request from ${encodeURIComponent(name)}&body=Hello Chelsea Shuttles,%0A%0AI would like to make a booking:%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0ANumber of Passengers: ${encodeURIComponent(passengers)}%0ARoute: ${encodeURIComponent(route)}%0APreferred Date: ${encodeURIComponent(date)}%0A%0AThank you!`

  console.log("[v0] Opening email client...")

  const responseDiv = document.getElementById("responseMessage")
  responseDiv.style.display = "block"
  responseDiv.className = "response-message success"
  responseDiv.innerHTML = "✓ Email client opening... Please send the booking details"

  // Open email client
  window.location.href = mailtoLink

  // Reset form and close modal after delay
  setTimeout(() => {
    closeModal()
    bookingForm.reset()
    responseDiv.style.display = "none"
    emailSubmit.textContent = originalText
    emailSubmit.disabled = false
  }, 1500)
})

function initDecemberChart() {
  const ctx = document.getElementById('decemberChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Bookings',
          data: [120, 190, 150, 220],
          backgroundColor: '#0a4d68',
          borderColor: '#198754',
          borderWidth: 2,
          borderRadius: 10
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#1a1a1a'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#6c757d'
            },
            grid: {
              color: '#e9ecef'
            }
          },
          x: {
            ticks: {
              color: '#6c757d'
            },
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}

// Initialize chart on page load
document.addEventListener('DOMContentLoaded', initDecemberChart);

