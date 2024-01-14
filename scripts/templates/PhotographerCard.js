class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer;
    console.log(this);
  }

  createPhotographerCard() {
    const $wrapper = document.createElement("article");
    $wrapper.className = "photographer_article";
    const photographerCard = `
    <a href="/photographer.html?id=${this._photographer.id}" aria-label="${this._photographer.name}">
    <div class="card_link">
    <img src="assets/photographers/${this._photographer.portrait}" alt="${this._photographer.name}">
    <h2>${this._photographer.name}</h2>
    </div>
    </a>

    <h3>${this._photographer.city}, ${this._photographer.country}</h3>
    <P>${this._photographer.tagline}</p>
    <span>${this._photographer.price}€/jour</span>
    `;

    $wrapper.innerHTML = photographerCard;
    return $wrapper;
  }
}
