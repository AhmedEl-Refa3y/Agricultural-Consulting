// تخزين بيانات المستخدمين
let users = JSON.parse(localStorage.getItem("users")) || [
  { name: "مسؤول النظام", email: "admin@example.com", password: "123456" },
];

// تسجيل مستخدم جديد
document
  .getElementById("registerForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // التحقق من صحة الإدخال
    if (!name || !email || !password) {
      showAlert("الرجاء ملء جميع الحقول", "danger");
      return;
    }

    // التحقق من صحة البريد الإلكتروني
    if (!validateEmail(email)) {
      showAlert("البريد الإلكتروني غير صالح", "danger");
      return;
    }

    // التحقق من عدم وجود مستخدم بنفس البريد
    if (users.some((user) => user.email === email)) {
      showAlert("البريد الإلكتروني مسجل مسبقاً", "danger");
      return;
    }

    // إضافة المستخدم الجديد
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    showAlert("تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول", "success");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });

// تسجيل الدخول
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // البحث عن المستخدم
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
    showAlert(`مرحباً ${user.name}! تم تسجيل الدخول بنجاح`, "success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  } else {
    showAlert("البريد الإلكتروني أو كلمة المرور غير صحيحة", "danger");
  }
});

// التحقق من صحة البريد الإلكتروني
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// إظهار تنبيه
function showAlert(message, type) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
  alertDiv.setAttribute("role", "alert");
  alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

  const form = document.querySelector("form");
  form.prepend(alertDiv);

  setTimeout(() => {
    alertDiv.classList.remove("show");
    setTimeout(() => alertDiv.remove(), 150);
  }, 5000);
}

// التحقق من حالة تسجيل الدخول عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (
    isLoggedIn &&
    (window.location.pathname.includes("login.html") ||
      window.location.pathname.includes("register.html"))
  ) {
    window.location.href = "index.html";
  }

  updateNavbar();
});
