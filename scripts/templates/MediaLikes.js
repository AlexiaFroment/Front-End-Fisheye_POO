class MediaLikes {
  constructor(media) {
    this._media = media;
    this.allMedias = Array.from(
      document.querySelectorAll(".card > .info > .likes_photo >.countLike")
    );
    this.likesArr = this.allMedias.map((likes) => Number(likes.innerHTML));
  }

  // method reduce => calculate the total number of likes in the gallery
  totalLikes() {
    const totalLikes = this.likesArr.reduce((acc, likes) => acc + likes, 0);

    return totalLikes;
  }

  getLikes() {
    this.$wrapperLikes = document.createElement("span");
    this.$wrapperLikes.className = "likes_count";
    const likes = `
      <span class="likes_count"> ${this.totalLikes()} ♥</span>   
      `;
    this.$wrapperLikes.innerHTML = likes;

    return this.$wrapperLikes;
  }
}
