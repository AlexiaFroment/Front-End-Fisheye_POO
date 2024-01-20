class MediasFilter {
  constructor(media) {
    this._media = media;
    this.mediaCopy = this._media;

    this.$wrapperMediasContainer = document.querySelector(".medias_container");
  }

  deleteDOM() {
    this.$wrapperMediasContainer.innerHTML = "";
  }

  sortFamous(e) {
    e.preventDefault();
    const filteredByLikes = this.mediaCopy.sort((a, b) => {
      return a.likes - b.likes;
    });

    // console.log("famous", filteredByLikes);
    this.deleteDOM(this);

    filteredByLikes.forEach((media) => {
      const templateArticle = new MediaCard(media);
      this.$wrapperMediasContainer.appendChild(
        templateArticle.createMediaCard()
      );
    });
  }

  sortDate(e) {
    e.preventDefault();
    const chronoOrder = this.mediaCopy.sort((a, b) => {
      return Date.parse(a.date) - Date.parse(b.date);
    });
    // console.log("date", chronoOrder);
    this.deleteDOM(this);

    chronoOrder.forEach((media) => {
      const templateArticle = new MediaCard(media);
      this.$wrapperMediasContainer.appendChild(
        templateArticle.createMediaCard()
      );
    });
  }

  sortTitle(e) {
    e.preventDefault();
    const alphaOrder = this.mediaCopy.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    // console.log("title", alphaOrder);
    this.deleteDOM(this);

    alphaOrder.forEach((media) => {
      const templateArticle = new MediaCard(media);
      this.$wrapperMediasContainer.appendChild(
        templateArticle.createMediaCard()
      );
    });
  }

  createFilterMedia() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "dropdown";

    const filterMedias = `
              <button class="bloc_top">
                <span id="famous">Popularité</span>
                <span id="icon"><i class="fa-solid fa-chevron-down"></i></span>
              </button>
              <div class="bloc_filter">
                <hr class="separator">
                </hr>
                <span id="date">Date</span>
                <hr class="separator">
                </hr>
                <span id="title">Titre</span>
              </div>    
    `;

    this.$wrapper.innerHTML = filterMedias;

    this.icon = document.querySelector("#icon");

    let toggleIndex = 0;

    this.$wrapper.querySelector(".bloc_top").addEventListener("click", () => {
      if (toggleIndex === 0) {
        this.$wrapper.style.height = "210px";
        icon.style.transform = "rotate(-180deg)";
        toggleIndex++;
      } else {
        console.log("fermé");
        this.$wrapper.style.height = "65px";
        icon.style.transform = "rotate(0deg)";
        toggleIndex--;
      }
    });

    this.$wrapper
      .querySelector("#famous")
      .addEventListener("click", this.sortFamous.bind(this));
    this.$wrapper
      .querySelector("#date")
      .addEventListener("click", this.sortDate.bind(this));
    this.$wrapper
      .querySelector("#title")
      .addEventListener("click", this.sortTitle.bind(this));

    return this.$wrapper;
  }
}
