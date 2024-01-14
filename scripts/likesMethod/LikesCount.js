class LikesCount {
  constructor(media) {
    this._media = media;
    this.count = 0;
  }

  countTotalLikes() {
    const totalLikes = this._media.reduce((acc, media) => acc + media.likes, 0);
    return totalLikes;
  }

  update(action) {
    if (action === "INC") {
      this.count += 1;
    } else if (action === "DEC") {
      this.count -= 1;
    } else {
      throw "Unknow action";
    }
    return this.count;
  }

  getLikesCount() {
    this.$wrapperLikes = document.createElement("span");
    this.$wrapperLikes.className = "likes";
    const likes = ` <span class="likes_count"> ${
      this.count + this.countTotalLikes()
    } ♥</span>`;
    this.$wrapperLikes.innerHTML = likes;

    this.update.bind(this);
    return this.$wrapperLikes;
  }
}
