// Initialize EmailJS
(function () {
  emailjs.init("u2frpKxeogc1Xvm4m");
})();

// Scroll smooth for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const yOffset = -70; // Adjust for fixed header height
      const yPosition =
        target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  });
});

// Phone mask function
function applyPhoneMask(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length > 2 && value.length <= 6) {
    value = value.replace(/^(\d{2})(\d{1,4})/, "$1 $2");
  } else if (value.length > 6) {
    value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, "$1 $2-$3");
  }
  input.value = value;
}

document.getElementById("phone").addEventListener("input", function () {
  applyPhoneMask(this);
});

// Form submission
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Phone validation pattern
    const phonePattern = /^\d{2}\s\d{4,5}-\d{4}$/;

    // Form validation
    if (!name || !email || !phone || !message) {
      showModal("Todos os campos devem ser preenchidos!");
      return;
    }

    if (!phonePattern.test(phone)) {
      showModal(
        "O telefone deve estar no formato DDD + Número (Ex: 11 98765-4321)"
      );
      return;
    }

    // EmailJS parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phone,
      message: message,
    };

    // Send email
    emailjs.send("service_qwqf8ls", "template_5vikpmf", templateParams).then(
      function (response) {
        showModal("E-mail enviado com sucesso!", true);
        document.getElementById("contactForm").reset();
      },
      function (error) {
        showModal(
          "Ocorreu um erro ao enviar o e-mail. Tente novamente mais tarde."
        );
      }
    );
  });

// Modal functions
function showModal(message, success = false) {
  const modalMessage = document.getElementById("modalBody");
  modalMessage.textContent = message;
  const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
  errorModal.show();
}

// Navbar transparency on scroll
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const contactSection = document.querySelector(".contact-section");
  const contactFormWrapper = document.querySelector(".contact-form-wrapper");

  // Function to check if the contact section is in view
  function checkInView() {
    const rect = contactSection.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      contactSection.classList.add("active");
    } else {
      contactSection.classList.remove("active");
    }
  }

  // Check initially and on scroll
  window.addEventListener("scroll", checkInView);
  checkInView(); // Initial check
});
