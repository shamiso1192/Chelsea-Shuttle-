// Booking Modal
const modal = document.getElementById("bookingModal");
const closeBtn = document.querySelector(".close");

// Open modal when "Book Now" clicked
document.querySelectorAll(".book-btn").forEach(button => {
  button.addEventListener("click", function () {
    const route = this.getAttribute("data-route");
    document.getElementById("routeField").value = route;
    modal.style.display = "flex"; // show modal
  });
});

// Close modal when X clicked
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Close modal if user clicks outside content
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
