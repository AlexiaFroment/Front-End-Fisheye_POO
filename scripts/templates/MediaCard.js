class MediaCard {
  constructor(media) {
    this._media = media;
  }

  // update counter of total likes
  updateBoxLikes() {
    this.$boxLikes = document.querySelector(".likes_count");
    this.$boxLikes.innerHTML = "";
    const templateLikes = new MediaLikes(this._media);
    this.$boxLikes.appendChild(templateLikes.getLikes());
  }

  // update like and dislike on each media
  countLikeBox() {
    const that = this;
    this.$likesPhoto = this.$wrapper.querySelector(".likes_photo");
    this.$likesSpan = this.$wrapper.querySelector(".countLike");

    this.$likesPhoto.addEventListener("click", function () {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        that.$likesSpan.innerHTML = `${that._media.likes - 1}`;
        that._media.likes -= 1;
        that.updateBoxLikes(that);
      } else {
        this.classList.add("active");
        that.$likesSpan.innerHTML = `${that._media.likes + 1}`;
        that._media.likes += 1;

        that.updateBoxLikes(that);
      }
    });
  }

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
      const lightbox = new LightboxModal(this._media);
      lightbox.createLightbox(index);
    });

    this.countLikeBox();

    return this.$wrapper;
  }
}
