// تحميل التذييل تلقائياً
document.addEventListener("DOMContentLoaded", function () {
  // تحميل التذييل
  fetch("partials/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch((error) => console.error("Error loading footer:", error));

  // فلترة المقالات
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const articlesContainer = document.getElementById("articlesContainer");
  const articles = articlesContainer?.querySelectorAll(".col-md-4");

  if (searchInput && articles) {
    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();
      filterArticles(searchTerm, categoryFilter.value);
    });
  }

  if (categoryFilter && articles) {
    categoryFilter.addEventListener("change", function () {
      filterArticles(
        searchInput?.value.toLowerCase() || "",
        categoryFilter.value
      );
    });
  }

  // تحميل المزيد من المقالات
  const loadMoreButton = document.getElementById("loadMore");
  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", function () {
      loadMoreArticles();
    });
  }

  // التحقق من صحة النماذج
  const forms = document.querySelectorAll(
    "form:not(#loginForm):not(#registerForm)"
  );
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      showAlert("تم إرسال الطلب بنجاح!", "success");
      form.reset();
    });
  });

  // إظهار تنبيه
  function showAlert(message, type) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.setAttribute("role", "alert");
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    const container =
      document.querySelector(".container") || document.querySelector("main");
    container.prepend(alertDiv);

    setTimeout(() => {
      alertDiv.classList.remove("show");
      setTimeout(() => alertDiv.remove(), 150);
    }, 5000);
  }

  // فلترة المقالات
  function filterArticles(searchTerm, category) {
    articles.forEach((article) => {
      const title = article
        .querySelector(".card-title")
        .textContent.toLowerCase();
      const articleCategory = article.getAttribute("data-category");
      const matchesSearch = title.includes(searchTerm);
      const matchesCategory =
        category === "all" || articleCategory === category;

      if (matchesSearch && matchesCategory) {
        article.style.display = "block";
      } else {
        article.style.display = "none";
      }
    });
  }

  // تحميل المزيد من المقالات (وهمي)
  function loadMoreArticles() {
    showAlert("جاري تحميل المزيد من المقالات...", "info");
    setTimeout(() => {
      // في تطبيق حقيقي، هنا سيتم جلب البيانات من الخادم
      showAlert("تم تحميل المزيد من المقالات", "success");
    }, 1500);
  }

  // إدارة حالة تسجيل الدخول في شريط التنقل
  updateNavbar();
});

// تحديث شريط التنقل بناءً على حالة تسجيل الدخول
function updateNavbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loginLink = document.getElementById("loginLink");
  const logoutLink = document.getElementById("logoutLink");
  const logoutBtn = document.getElementById("logoutBtn");

  if (isLoggedIn) {
    if (loginLink) loginLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "block";
  } else {
    if (loginLink) loginLink.style.display = "block";
    if (logoutLink) logoutLink.style.display = "none";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.setItem("isLoggedIn", "false");
      updateNavbar();
      window.location.href = "index.html";
    });
  }
}
