document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.querySelector("nav ul");

  mobileMenuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");
  });

  const navLinks = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuItems = document.querySelectorAll(".menu-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      menuItems.forEach((item) => {
        if (filter === "all") {
          item.style.display = "block";
        } else if (item.classList.contains(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  const toggleLunchInfoButton = document.getElementById("toggle-lunch-info");
  const lunchInfo = document.getElementById("lunch-info");

  toggleLunchInfoButton.addEventListener("click", function () {
    lunchInfo.classList.toggle("show");

    if (lunchInfo.classList.contains("hidden")) {
      toggleLunchInfoButton.textContent = "Visa lunchbuffé-information";
    } else {
      toggleLunchInfoButton.textContent = "Dölj lunchbuffé-information";
    }
  });

  const addToOrderButtons = document.querySelectorAll(".add-to-order");
  const orderItems = document.getElementById("order-items");
  const totalPrice = document.getElementById("total-price");
  const clearOrderButton = document.getElementById("clear-order");

  let order = [];
  let total = 0;

  addToOrderButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const name = this.getAttribute("data-name");
      const price = parseInt(this.getAttribute("data-price"));

      order.push({ name, price });

      total += price;

      updateOrderUI();
    });
  });

  clearOrderButton.addEventListener("click", function () {
    order = [];
    total = 0;
    updateOrderUI();
  });

  function updateOrderUI() {
    orderItems.innerHTML = "";

    if (order.length === 0) {
      orderItems.innerHTML =
        '<p class="empty-order">Din beställning är tom</p>';
    } else {
      order.forEach((item, index) => {
        const orderItem = document.createElement("div");
        orderItem.className = "order-item";
        orderItem.innerHTML = `
                  <span>${item.name}</span>
                  <span>${item.price} kr</span>
              `;
        orderItems.appendChild(orderItem);
      });
    }

    totalPrice.textContent = total;
  }
});
