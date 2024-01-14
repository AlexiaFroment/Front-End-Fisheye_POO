class PhotographerPrice {
  constructor(photographer) {
    this._photographer = photographer;
  }

  getPrice() {
    this.$wrapperPrice = document.createElement("span");
    this.$wrapperPrice.className = "price";
    const price = ` <span>${this._photographer.price} €/jour</span>`;
    this.$wrapperPrice.innerHTML = price;

    return this.$wrapperPrice;
  }
}
