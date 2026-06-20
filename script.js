// ===== АНИМАЦИЯ ПОЯВЛЕНИЯ СЕКЦИЙ =====

const animatedSections = document.querySelectorAll(".section-animate");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.16
  }
);

animatedSections.forEach((section) => {
  observer.observe(section);
});


// ===== ПОЛУЧАЕМ ЭЛЕМЕНТЫ ФОРМЫ =====

const contactForm = document.getElementById("contactForm");
const fullNameInput = document.getElementById("fullName");
const phoneInput = document.getElementById("phone");
const shootTypeSelect = document.getElementById("shootType");

const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");
const typeError = document.getElementById("typeError");


// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ОШИБОК =====

function showError(input, errorElement) {
  input.classList.add("is-error");
  errorElement.classList.add("is-visible");
}

function hideError(input, errorElement) {
  input.classList.remove("is-error");
  errorElement.classList.remove("is-visible");
}


// ===== ПРОВЕРКА ИМЕНИ И ФАМИЛИИ =====

function validateCapitalizedNamePart(part) {
  const russianPattern = /^[А-ЯЁ][а-яё]+(?:-[А-ЯЁ][а-яё]+)?$/;
  const englishPattern = /^[A-Z][a-z]+(?:-[A-Z][a-z]+)?$/;

  return russianPattern.test(part) || englishPattern.test(part);
}

function validateFullName() {
  const value = fullNameInput.value.trim();
  const parts = value.split(/\s+/).filter(Boolean);

  if (value === "") {
    nameError.textContent = "Введите Ваши Имя и Фамилию через пробел";
    showError(fullNameInput, nameError);
    return false;
  }

  if (parts.length < 2) {
    nameError.textContent = "Введите Ваши Имя и Фамилию через пробел";
    showError(fullNameInput, nameError);
    return false;
  }

  const isValid = parts.every((part) => validateCapitalizedNamePart(part));

  if (!isValid) {
    nameError.textContent = "Имя и Фамилия должны начинаться с большой буквы";
    showError(fullNameInput, nameError);
    return false;
  }

  hideError(fullNameInput, nameError);
  return true;
}


// ===== ПРОВЕРКА ТЕЛЕФОНА =====

function validatePhone() {
  const value = phoneInput.value.trim();
  const compactValue = value.replace(/\s/g, "");
  const digits = value.replace(/\D/g, "");

  if (value === "") {
    phoneError.textContent = "Введите номер телефона";
    showError(phoneInput, phoneError);
    return false;
  }

  if (compactValue.startsWith("+8")) {
    phoneError.textContent = "Номер должен начинаться с +7 или 8";
    showError(phoneInput, phoneError);
    return false;
  }

  if (!compactValue.startsWith("+7") && !compactValue.startsWith("8")) {
    phoneError.textContent = "Номер должен начинаться с +7 или 8";
    showError(phoneInput, phoneError);
    return false;
  }

  if (compactValue.startsWith("+7") && digits.length !== 11) {
    phoneError.textContent = "Введите корректный номер телефона";
    showError(phoneInput, phoneError);
    return false;
  }

  if (compactValue.startsWith("8") && digits.length !== 11) {
    phoneError.textContent = "Введите корректный номер телефона";
    showError(phoneInput, phoneError);
    return false;
  }

  hideError(phoneInput, phoneError);
  return true;
}


// ===== ПРОВЕРКА ВЫБОРА ТИПА СЪЕМКИ =====

function validateShootType() {
  const value = shootTypeSelect.value.trim();

  if (value === "") {
    typeError.textContent = "Выберите тип фотосессии";
    showError(shootTypeSelect, typeError);
    return false;
  }

  hideError(shootTypeSelect, typeError);
  return true;
}


// ===== ПРОВЕРКА В МОМЕНТ ВВОДА =====

fullNameInput.addEventListener("input", validateFullName);
phoneInput.addEventListener("input", validatePhone);
shootTypeSelect.addEventListener("change", validateShootType);


// ===== ОТПРАВКА ФОРМЫ =====

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const isNameValid = validateFullName();
  const isPhoneValid = validatePhone();
  const isTypeValid = validateShootType();

  if (!isNameValid || !isPhoneValid || !isTypeValid) {
    return;
  }

  alert("Спасибо! Мы свяжемся с вами");
  contactForm.reset();

  hideError(fullNameInput, nameError);
  hideError(phoneInput, phoneError);
  hideError(shootTypeSelect, typeError);
});