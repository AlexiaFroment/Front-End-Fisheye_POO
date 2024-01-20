class MediaLikes {
  constructor(media) {
    this._media = media;
    this.allMedias = Array.from(
      document.querySelectorAll(".card > .info > .likes_photo >.countLike")
    );
    this.likesArr = this.allMedias.map((likes) => Number(likes.innerHTML));
  }

  totalLikes() {
    console.log("totallikes", this.likesArr);
    const totalLikes = this.likesArr.reduce((acc, likes) => acc + likes, 0);
    console.log(totalLikes);
    return totalLikes;
  }

  getLikes() {
    this.$wrapperLikes = document.createElement("span");
    this.$wrapperLikes.className = "likes_count";
    const likes = `
      <span class="likes_count"> ${this.totalLikes()} ♥</span>   
      `;
    this.$wrapperLikes.innerHTML = likes;
    // console.log(this.totalLikes());
    return this.$wrapperLikes;
  }
}
