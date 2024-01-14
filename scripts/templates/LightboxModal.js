class LightboxModal {
  constructor(media) {
    this._media = media;

    // this.allMedias = document.querySelectorAll(".card");
    // console.log(allMedias);

    this.$Main = document.querySelector("#main");
    this.$modalWrapperLightbox = document.querySelector(".modal_lightbox");
    this.$wrapper = document.createElement("div");

    this.onKeyUp = this.onKeyUp.bind(this);
    document.addEventListener("keyup", this.onKeyUp);
  }

  /**
   *AddEventListener to click & to keyboard
   * @param {MouseEvent/KeyboardEvent} e
   */

  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }
  prev(e) {
    e.preventDefault();
    console.log("prev", this._card, this.allMedias, this._media);

    this.allMedias.map((media) => {
      new MediasData(media);
    });
    const i = this.allMedias.findIndex((media) => id == media.id);
    // const media = this.allMedias[i]

    // let i = this.allMedias.findIndex((media) => {
    //   media === this._card;
    // });
    console.log(i);
    if (i === 0) {
      i = this.allMedias.length;
    }
    this.createLightbox(this._media[i - 1]);
  }
  next(e) {
    e.preventDefault();
    console.log("next", this.allMedias, this._media);
    let i = this.allMedias.findIndex((media) => media === this._media);
    console.log(i);
    if (i === this.allMedias.length - 1) {
      i = -1;
    }
    this.createLightbox(this._media[i + 1]);
  }

  close(e) {
    e.preventDefault();
    this.$modalWrapperLightbox.classList.remove("active");
    this.$wrapper.remove();
    body.classList.remove("no-scroll");
    this.$Main.ariaHidden = "false";
    this.$modalWrapperLightbox.ariaHidden = "true";
    document.removeEventListener("keyup", this.onKeyUp);
  }

  createLightbox(index) {
    this.allMedias = document.querySelectorAll(".card");
    this._card = this.allMedias[index];
    console.log(this);

    const img = `
    <div class="lightbox_container">
    <img class="media" src="assets/medias/${this._media.image}" alt="${this._media.title}" id="${this._media.id}"/>
    <h3>${this._media.title}</h3>
    </div>
    `;

    const video = `
    <div class="lightbox_container">
    <video controls class="media" src="assets/medias/${this._media.video}" alt="${this._media.title}" id="${this._media.id}"></video>
    <h3>${this._media.title}</h3>
    </div>
    `;

    const modalLightbox = `
    <button class="lightbox_close" aria-label="lightbox_close"></button>
    <button class="lightbox_next controls" aria-label="lightbox_next"></button>
    <button class="lightbox_prev controls" aria-label="lightbox_prev"></button>
    `;

    const mediaInLightbox = () => {
      if (this._media.hasOwnProperty("image")) {
        return img;
      } else if (this._media.hasOwnProperty("video")) {
        return video;
      } else {
        throw "Unknown type format";
      }
    };

    this.$wrapper.innerHTML = mediaInLightbox(this._media);
    this.$wrapper.innerHTML += modalLightbox;

    this.$modalWrapperLightbox.classList.add("active");
    body.classList.add("no-scroll");
    this.$Main.ariaHidden = "true";
    this.$modalWrapperLightbox.ariaHidden = "false";

    this.$modalWrapperLightbox.appendChild(this.$wrapper);

    this.$wrapper
      .querySelector(".lightbox_close")
      .addEventListener("click", this.close.bind(this));
    this.$wrapper
      .querySelector(".lightbox_next")
      .addEventListener("click", this.next.bind(this));
    this.$wrapper
      .querySelector(".lightbox_prev")
      .addEventListener("click", this.prev.bind(this));

    return this.$modalWrapperLightbox;
  }
}
