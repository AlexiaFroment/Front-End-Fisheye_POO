class PhotographerAbout {
  constructor(photographer) {
    this._photographer = photographer;
    // console.log(this);
  }

  openForm(e) {
    e.preventDefault();
    const form = new FormModal(this._photographer);
    form.createForm(this._photographer);
  }

  createPhotographerAbout() {
    const $wrapper = document.createElement("div");
    $wrapper.className = "about_photographer";
    const PhotographerAbout = `
    <div class="photograph_contact">
      <button class="contact_btn modal-trigger">Contactez-moi</button>
    </div>
    <div class="photograph_infos">
      <h2>${this._photographer.name}</h2>
      <h3>${this._photographer.city}, ${this._photographer.country}</h3>
      <p>${this._photographer.tagline}</p>
    </div>
    <div class="photograph_img">
      <img src="assets/photographers/${this._photographer.portrait}" alt="${this._photographer.name}">
    </div>
    `;

    $wrapper.innerHTML = PhotographerAbout;

    $wrapper
      .querySelector(".contact_btn")
      .addEventListener("click", this.openForm.bind(this));

    return $wrapper;
  }
}
