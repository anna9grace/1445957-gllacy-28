var modalOpen = document.querySelector(".modal-open-btn");
var modalFeedback = document.querySelector(".feedback.modal");
var modalWrapper = document.querySelector(".modal-wrapper");
var modalClose = modalFeedback.querySelector(".close-modal");
var feedbackForm = modalFeedback.querySelector(".feedback-form");
var nameField = modalFeedback.querySelector("[id=questions-name]");
var emailField = modalFeedback.querySelector("[id=questions-email]");
var questionField = modalFeedback.querySelector("[id=questions-text]");
var slideButtons = document.querySelectorAll(".slider-controls-btn");
var slides = document.querySelectorAll(".slide");
var pageColor = document.querySelector(".page-wrapper");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch(err) {
  isStorageSupport = false;
}

modalOpen.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalFeedback.classList.add("modal-show");
  modalWrapper.classList.add("background-show");
  modalFeedback.classList.remove("form-error");
  nameField.focus();

  if (storageName) {
    nameField.value = storageName;
    emailField.focus();
  }

  if (storageEmail) {
    emailField.value = storageEmail;
    questionField.focus();
  }
});

modalClose.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalFeedback.classList.remove("modal-show");
  modalWrapper.classList.remove("background-show");
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (modalFeedback.classList.contains("modal-show")) {
      evt.preventDefault();
      modalFeedback.classList.remove("modal-show");
      modalWrapper.classList.remove("background-show");
    }
  }
})

feedbackForm.addEventListener("submit", function(evt) {
  if(!nameField.value || !emailField.value || !questionField.value) {
    evt.preventDefault();
    modalFeedback.classList.remove("form-error");
    modalFeedback.offsetWidth = modalFeedback.offsetWidth;
    modalFeedback.classList.add("form-error");
  } else {
    localStorage.setItem("name", nameField.value);
    localStorage.setItem("email", emailField.value);
  }
})

slideButtons[0].classList.add("current-btn");

for (let i = 0; i < slideButtons.length; i++) {
  slideButtons[i].onclick = function(evt) {
    evt.preventDefault();
    var currentBtn = document.querySelector(".current-btn");
    currentBtn.classList.remove("current-btn");
    slideButtons[i].classList.add("current-btn");

    var currentSlide = document.querySelector(".slide-shown");
    currentSlide.classList.remove("slide-shown");
    slides[i].classList.add("slide-shown");

    for (n = 1; n < slideButtons.length; n++) {
      if (pageColor.classList.contains("icecream-bg-"+ n)) {
        pageColor.classList.remove("icecream-bg-"+ n);
      }
    }

    pageColor.classList.add("icecream-bg-"+ i);
  }
}
