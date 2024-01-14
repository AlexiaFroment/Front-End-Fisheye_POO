class MediaLikes {
  constructor(photographer, media, LikesSubject) {
    this._photographer = photographer;
    this._media = media;
    this.LikesSubject = LikesSubject;
    // console.log(this);
  }

  totalLikes() {
    const totalLikes = this._media.reduce((acc, media) => acc + media.likes, 0);
    return totalLikes;
  }

  createBoxLikes() {
    const $wrapper = document.createElement("div");
    $wrapper.className = "block_likes_price";
    const countLikesAndDisplayPrice = `
      <span class="likes_count"> ${this.totalLikes()} ♥</span>
      <span>${this._photographer.price} €/jour</span>
      `;
    $wrapper.innerHTML = countLikesAndDisplayPrice;

    return $wrapper;
  }
}
