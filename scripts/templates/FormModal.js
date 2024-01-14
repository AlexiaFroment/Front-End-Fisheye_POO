/**
 * ❌ Add keyUp for close modal
 */
class FormModal {
  constructor(photographer) {
    this._photographer = photographer;

    this.$Main = document.querySelector("#main");
    this.$modalWrapper = document.querySelector(".modal_form");

    this._inputsValidity = {
      fName: false,
      lName: false,
      mail: false,
      message: false,
    };

    this.isAnimated = false;
  }

  // ✅ that's work
  messageValidation() {
    if (this.$messageInput.value.length >= 5) {
      this.showValidation({ index: 3, validation: true });
      this._inputsValidity.message = true;
    } else {
      this.showValidation({ index: 3, validation: false });
      this._inputsValidity.message = false;
    }
  }

  // ✅ that's work
  mailValidation() {
    const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (regexEmail.test(email.value)) {
      this.showValidation({ index: 2, validation: true });
      this._inputsValidity.mail = true;
    } else {
      this.showValidation({ index: 2, validation: false });
      this._inputsValidity.mail = false;
    }
  }

  // ✅ that's work
  lastNameValidation() {
    if (lastName.value.length >= 3) {
      this.showValidation({ index: 1, validation: true });
      this._inputsValidity.lName = true;
    } else {
      this.showValidation({ index: 1, validation: false });
      this._inputsValidity.lName = false;
    }
  }

  // ✅ that's work
  firstNameValidation() {
    if (firstName.value.length >= 3) {
      this.showValidation({ index: 0, validation: true });
      this._inputsValidity.fName = true;
    } else {
      this.showValidation({ index: 0, validation: false });
      this._inputsValidity.fName = false;
    }
  }

  // ✅ that's work
  showValidation({ index, validation }) {
    if (validation) {
      this.$validationIcons[index].style.display = "inline";
      this.$validationIcons[index].src = "../assets/icons/check.svg";
      this.$errorMsg[index].style.display = "none";
    } else {
      this.$validationIcons[index].style.display = "inline";
      this.$validationIcons[index].src = "../assets/icons/error.svg";
      this.$errorMsg[index].style.display = "block";
    }
  }

  validateForm(e) {
    e.preventDefault();
    console.log(this.$btnSubmit);
    const keys = Object.keys(this._inputsValidity);
    const failedInputs = keys.filter((key) => !this._inputsValidity[key]);

    if (failedInputs.length && !this.isAnimated) {
      this.isAnimated = true;
      this.$btnSubmit.classList.add("shake");
      setTimeout(() => {
        this.$btnSubmit.classList.remove("shake");
        this.isAnimated = false;
      }, 400);
      failedInputs.forEach((input) => {
        const index = keys.indexOf(input);
        this.showValidation({ index: index, validation: false });
      });
    } else {
      console.log(`
      prénom : ${firstName.value}
      nom : ${lastName.value}
      email : ${email.value}
      message : ${this.$messageInput.value} `);
      this.closeModalForm();
    }
  }

  // ✅ that's work
  closeModalForm() {
    // e.preventDefault();
    this.$modalWrapper.classList.remove("active");
    this.$modalWrapper.innerHTML = "";
    body.classList.remove("no-scroll");
    this.$Main.ariaHidden = "false";
    this.$modalWrapper.ariaHidden = "true";
  }

  // ✅ Create form, ok that's work
  createForm() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "modal";

    const modalForm = `
    <header>
      <div class="contact">
        <h2 id="modalTitle">Contactez-moi</h2>
        <h3 id="contact-name">${this._photographer.name}</h3>
      </div>
      <button>
        <img src="./assets/icons/closeWhite.svg" class="formModal_close" aria-label="formModal_close" />
      </button>
    </header>

    <form name="contact" action="photographer.html" method="get">
    
      <div class="form_data">
        <label for="firstName">Prénom</label>
        <div class="icon-input-verif">
          <input type="text" id="firstName" name="firstName" placeholder="3 caractères minimum" />
          <img src="../assets/icons/check.svg" alt="icone de validation" class="check-icon">
        </div>
        <span class="error-msg">Votre prénom doit contenir au moins 3 caractères</span>
      </div>
     
      <div class="form_data">
        <label for="lastName">Nom</label>
        <div class="icon-input-verif">
          <input type="text" id="lastName" name="lastName" placeholder="3 caractères minimum" />
          <img src="../assets/icons/check.svg" alt="icone de validation" class="check-icon">
        </div>
        <span class="error-msg">Votre nom doit contenir au moins 3 caractères</span>
      </div>

      <div class="form_data">
        <label for="email">Email</label>
        <div class="icon-input-verif">
          <input type="text" id="email" name="email" />
          <img src="../assets/icons/check.svg" alt="icone de validation" class="check-icon">
        </div>
        <span class="error-msg">Ce format d'email n'est pas valide</span>
      </div>

      <div class="form_data">
        <label for="message">Votre message</label>
        <div class="icon-input-verif">
          <textarea name="message" id="message"></textarea>
          <img src="../assets/icons/check.svg" alt="icone de validation" class="check-icon">
        </div>
        <span class="error-msg">Votre message doit contenir au moins 10 caractères</span>
      </div>

      <button type="submit" class="submit_button">Envoyer</button>

    </form>
    `;

    this.$wrapper.innerHTML = modalForm;

    this.$modalWrapper.classList.add("active");
    body.classList.add("no-scroll");
    this.$Main.ariaHidden = "true";
    this.$modalWrapper.ariaHidden = "false";

    this.$modalWrapper.appendChild(this.$wrapper);

    this.$validationIcons = this.$wrapper.querySelectorAll(".check-icon");
    this.$errorMsg = this.$wrapper.querySelectorAll(".error-msg");
    this.$messageInput = this.$wrapper.querySelector("textarea");
    this.$form = this.$wrapper.querySelector("form");
    this.$btnSubmit = this.$wrapper.querySelector(".submit_button");

    this.$wrapper
      .querySelector(".formModal_close")
      .addEventListener("click", this.closeModalForm.bind(this));

    this.$wrapper
      .querySelector("form")
      .addEventListener("submit", this.validateForm.bind(this));

    firstName.addEventListener("input", this.firstNameValidation.bind(this));
    lastName.addEventListener("input", this.lastNameValidation.bind(this));
    email.addEventListener("input", this.mailValidation.bind(this));
    message.addEventListener("input", this.messageValidation.bind(this));

    return this.$modalWrapper;
  }
}
