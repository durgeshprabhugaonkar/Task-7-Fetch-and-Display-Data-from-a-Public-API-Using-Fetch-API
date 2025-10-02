// ========================
// Elements
// ========================
const container = document.getElementById("user-container");
const reloadBtn = document.getElementById("reload");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");
// Remove or comment out: const siteFooter = document.querySelector("footer");

// ========================
// Fetch Users from API
// ========================
async function fetchUsers() {
  container.innerHTML = "<p>Loading...</p>";
  // Remove or comment out: if (siteFooter) { siteFooter.style.display = 'none'; } // We no longer want to hide the footer

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const users = await response.json();
    renderUsers(users);

    // Remove or comment out: if (siteFooter) { siteFooter.style.display = 'block'; } // No need to explicitly show if never hidden

  } catch (error) {
    container.innerHTML = `<p class="error">⚠️ ${error.message}</p>`;
    // The footer will remain visible as it was never hidden by this script
  }
}

// ========================
// Render Users
// ========================
function renderUsers(users) {
  container.innerHTML = users.map(user => `
    <div class="user-card">
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
    </div>
  `).join("");
}

// Hamburger Menu Toggle
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Event Listeners
reloadBtn.addEventListener("click", fetchUsers);

// Initial Load
fetchUsers();
