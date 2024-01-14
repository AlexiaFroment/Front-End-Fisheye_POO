class MediaCard {
  constructor(media, LikesSubject) {
    this._media = media;
    // console.log(this);
    this.LikesSubject = LikesSubject;

    this.countLike = this._media.likes;
  }

  countLikeBox() {
    const that = this;
    // ❌ INC or DEC likes

    this.$wrapper
      .querySelector(".likes_photo")
      .addEventListener("click", function () {
        // console.log("countLike", this.countLike);
        // console.log("clic");
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          console.log(this.countLike);
          this.countLike -= 1;
          // console.log(this.countLike);
          that.LikesSubject.fire("DEC");
        } else {
          this.classList.add("active");
          // console.log(this.countLike);
          this.countLike += 1;
          // console.log(this.countLike);
          that.LikesSubject.fire("INC");
        }
      });
  }

  // openLightbox(index) {
  //   e.preventDefault();
  //   console.log("clickLB", index);
  //   const lightbox = new LightboxModal(this._media);
  //   lightbox.createLightbox(index);
  // }

  createMediaCard(index) {
    this.$wrapper = document.createElement("article");
    this.$wrapper.className = "card";

    const img = `
    <div class="media">
    <img class="media_img media" src="assets/medias/${this._media.image}" alt="${this._media.title}" id="${this._media.id}" />
    </div>`;

    const video = `
    <div class="media">
    <video class="media_mp4 media" src="assets/medias/${this._media.video}" alt="${this._media.title}" id="${this._media.id}"></video>
    </div>`;

    const mediaCard = `
    <div class="info">
    <span class="title_photo">${this._media.title}</span>
    <span class="likes_photo">
    <span class="countLike">${this._media.likes}</span>
    <span class="like">♥</span>
    </span>
    </div>
    `;

    const mediaInCard = () => {
      if (this._media.hasOwnProperty("image")) {
        return img;
      } else if (this._media.hasOwnProperty("video")) {
        return video;
      } else {
        throw "Unknown type format";
      }
    };

    this.$wrapper.innerHTML = mediaInCard();
    this.$wrapper.innerHTML += mediaCard;

    this.$wrapper.querySelector(".media").addEventListener("click", (e) => {
      e.preventDefault();
      console.log("clickLB", index);
      const lightbox = new LightboxModal(this._media);
      lightbox.createLightbox(index);
    });

    this.countLikeBox();

    return this.$wrapper;
  }
}
