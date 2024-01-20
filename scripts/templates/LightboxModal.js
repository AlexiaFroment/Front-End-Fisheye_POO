class LightboxModal {
  constructor(media) {
    this._media = media;

    this.$Main = document.querySelector("#main");
    this.$modalWrapperLightbox = document.querySelector(".modal_lightbox");
    this.$wrapper = document.createElement("div");

    this.onKeyUp = this.onKeyUp.bind(this);
    document.addEventListener("keyup", this.onKeyUp);
  }

  // deleteDOM() {
  //   this.$modalWrapperLightbox.innerHTML = "";
  // }

  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }

  next(e) {
    e.preventDefault();
    let i = this.findIndex;
    // console.log("index en cours", i);
    if (i === this.galery.length - 1) {
      i = -1;
    }
    i++;
    // console.log("index au clic next", i);
    this.createLightbox(i);
  }
  prev(e) {
    e.preventDefault();
    // console.log("index en cours", this.findIndex);
    let i = this.findIndex;
    if (i === 0) {
      i = this.galery.length;
      // console.log(this.galery.length);
    }
    i--;
    // console.log("index au clic sur prev", i);
    this.createLightbox(i);
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
    this.allMedias = Array.from(document.querySelectorAll(`.media`));
    this.galery = this.allMedias.filter((media) => media.id);
    console.log("galery", this.galery);
    this.card = this.galery[index];
    this.findIndex = this.galery.findIndex((el) => el === this.card);
    this.typeMedia = this.card.tagName;
    console.log(this.typeMedia);
    console.log(index);
    console.log("card ", this.card);
    console.log("media ", this._media);

    const img = `
    <div class="lightbox_container">
    <img class="media" src="${this.card.src}" alt="${this.card.alt}" id="${this.card.id}"/>
    <h3>${this.card.alt}</h3>
    </div>
    `;

    const video = `
    <div class="lightbox_container">
    <video class="media" src="${this.card.src}" alt="${this._media.title}" id="${this.card.id}" controls></video>
    <h3>${this._media.title}</h3>
    </div>
    `;

    const modalLightbox = `
    <button class="lightbox_close" aria-label="lightbox_close"></button>
    <button class="lightbox_next controls" aria-label="lightbox_next"></button>
    <button class="lightbox_prev controls" aria-label="lightbox_prev"></button>
    `;

    const mediaInLightbox = () => {
      if (this.typeMedia === "IMG") {
        return img;
      } else if (this.typeMedia === "VIDEO") {
        return video;
      } else {
        throw "Unknown type format";
      }
    };

    this.$wrapper.innerHTML = mediaInLightbox(this.card);
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
