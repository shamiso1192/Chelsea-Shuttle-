// Modal elements
const bookBtn = document.getElementById("bookBtn")
const ctaBtn = document.getElementById("ctaBtn")
const bookingModal = document.getElementById("bookingModal")
const closeBtn = document.querySelector(".close")
const bookingForm = document.getElementById("bookingForm")
const whatsappSubmit = document.getElementById("whatsappSubmit")
const emailSubmit = document.getElementById("emailSubmit")

// Open modal
bookBtn.addEventListener("click", openModal)
ctaBtn.addEventListener("click", openModal)

function openModal() {
  bookingModal.style.display = "block"
}

// Close modal
closeBtn.addEventListener("click", closeModal)

function closeModal() {
  bookingModal.style.display = "none"
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === bookingModal) {
    closeModal()
  }
})

// Handle WhatsApp submission with AJAX
whatsappSubmit.addEventListener("click", (e) => {
  e.preventDefault()
  
  if (bookingForm.checkValidity() === false) {
    bookingForm.classList.add("was-validated")
    return
  }

  const originalText = whatsappSubmit.textContent
  whatsappSubmit.textContent = "Processing..."
  whatsappSubmit.disabled = true

  // Collect form data
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const phone = document.getElementById("phone").value
  const passengers = document.getElementById("passengers").value
  const route = document.getElementById("route").value
  const date = document.getElementById("date").value

  fetch("C:\Users\shami\OneDrive\Desktop\chelseashuttles\process-booking.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      passengers,
      route,
      date,
      type: "whatsapp",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("[v0] Booking processed:", data)
      
      const message = `Booking Request:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPassengers: ${passengers}\nRoute: ${route}\nDate: ${date}`
      const encodedMessage = encodeURIComponent(message)
      const whatsappURL = `https://wa.me/27737197959?text=${encodedMessage}`

      window.open(whatsappURL, "_blank")
      closeModal()
      bookingForm.reset()
      
      whatsappSubmit.textContent = originalText
      whatsappSubmit.disabled = false
    })
    .catch((error) => {
      console.log("[v0] Error:", error)
      alert("Error processing booking. Please try again.")
      whatsappSubmit.textContent = originalText
      whatsappSubmit.disabled = false
    })
})

emailSubmit.addEventListener("click", (e) => {
  e.preventDefault()

  if (bookingForm.checkValidity() === false) {
    bookingForm.classList.add("was-validated")
    return
  }

  const originalText = emailSubmit.textContent
  emailSubmit.textContent = "Sending..."
  emailSubmit.disabled = true

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const phone = document.getElementById("phone").value
  const passengers = document.getElementById("passengers").value
  const route = document.getElementById("route").value
  const date = document.getElementById("date").value

  fetch("C:\Users\shami\OneDrive\Desktop\chelseashuttles\send-mail.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      passengers,
      route,
      date,
      type: "email",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const responseDiv = document.getElementById("responseMessage")
      
      if (data.success) {
        responseDiv.style.display = "block"
        responseDiv.className = "response-message success"
        responseDiv.innerHTML = "✓ Booking sent successfully! Check your email and WhatsApp for confirmation."
        
        setTimeout(() => {
          closeModal()
          bookingForm.reset()
          responseDiv.style.display = "none"
        }, 2000)
      } else {
        responseDiv.style.display = "block"
        responseDiv.className = "response-message error"
        responseDiv.innerHTML = "✗ Error: " + (data.message || "Failed to send booking")
      }
      
      emailSubmit.textContent = originalText
      emailSubmit.disabled = false
    })
    .catch((error) => {
      console.log("[v0] Error:", error)
      const responseDiv = document.getElementById("responseMessage")
      responseDiv.style.display = "block"
      responseDiv.className = "response-message error"
      responseDiv.innerHTML = "✗ Error processing booking. Please try again."
      
      emailSubmit.textContent = originalText
      emailSubmit.disabled = false
    })
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
