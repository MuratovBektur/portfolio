const submitBtn = document.querySelector(".contact .btn");
const formElems = document.querySelectorAll(
  ".contact form input, .contact form textarea"
);
const contactSuccessModal = document.querySelector(
  ".contact-success-modal-container"
);
const contactSuccessModalCloseBtn = document.querySelector(
  ".contact-success-modal .btn"
);
const contactSuccessModalText = document.querySelector(
  ".contact-success-modal-text"
);

submitBtn.onclick = async function (e) {
  let isValidForm = true;
  for (let i = 0; i < formElems.length; i++) {
    if (formElems[i].value === "" && formElems[i].hasAttribute("required")) {
      isValidForm = false;
    }
  }
  if (isValidForm) {
    e.preventDefault();
    try {
      await sendRequest();
      contactSuccessModalText.innerHTML = "Ваше сообщение отправлено!";
    } catch {
      contactSuccessModalText.style.color = "tomato";
      contactSuccessModalText.innerHTML = "Что-то пошло не так";
    } finally {
      contactSuccessModal.style.display = null;
    }
  }
};

async function sendRequest() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Something went wrong");
}

contactSuccessModalCloseBtn.onclick = () => {
  contactSuccessModal.style.display = "none";
};
