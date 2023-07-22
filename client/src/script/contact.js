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

function validateEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

submitBtn.onclick = async function (e) {
  let isValidForm = true;
  for (let i = 0; i < formElems.length; i++) {
    const formElem = formElems[i];
    const isEmail = formElem.type === "email";
    if (isEmail && !validateEmail(formElem.value)) {
      isValidForm = false;
      break;
    }
    if (formElem.value === "" && formElem.hasAttribute("required")) {
      isValidForm = false;
      break;
    }
  }
  if (isValidForm) {
    e.preventDefault();
    try {
      await sendRequest();
      contactSuccessModalText.style.color = "";
      contactSuccessModalText.innerHTML = "Ваше сообщение отправлено!";
    } catch {
      contactSuccessModalText.innerHTML = `
      <div>
        <h2 align="center" style="color: tomato; padding-bottom: 20px;">Что-то пошло не так</h2>
        <div>
          Все почтальоны, кажется, заняты. Вы можете связаться со мной в телеграмм
          <a
            href="https://t.me/Volodikova_E"
            target="_blank"
            style="color: var(--main-color); text-decoration: underline;"
          >
            @Volodikova_E
          </a>
        </div>
      </div>`;
    } finally {
      contactSuccessModal.style.display = null;
    }
  }
};

async function sendRequest() {
  const url = "/api/send-msg";
  // prettier-ignore
  const fullName = document.querySelector(".contact form input[name='fullNameInput']").value;
  // prettier-ignore
  const email = document.querySelector(".contact form input[name='emailInput']").value;
  // prettier-ignore
  const phoneNumber = document.querySelector(".contact form input[name='phoneNumberInput']").value;
  // prettier-ignore
  const subject = document.querySelector(".contact form input[name='subjectInput']").value;
  // prettier-ignore
  const msg = document.querySelector(".contact form textarea[name='msgInput']").value;

  const response = await fetch(url, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      fullName,
      email,
      phoneNumber,
      subject,
      msg,
    }),
  });

  if (!response.ok) throw new Error("Something went wrong");
}

contactSuccessModalCloseBtn.onclick = () => {
  contactSuccessModal.style.display = "none";
};
