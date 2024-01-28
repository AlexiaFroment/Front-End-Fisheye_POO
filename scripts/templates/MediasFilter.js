class MediasFilter {
  constructor(media) {
    this._media = media;
    this.mediaCopy = this._media;

    this.$wrapperMediasContainer = document.querySelector(".medias_container");
  }

  // delete DOM to display the new filter data
  deleteDOM() {
    this.$wrapperMediasContainer.innerHTML = "";
  }

  // sort by number of like on each media
  sortFamous(e) {
    e.preventDefault();
    let toggleIndex = 0;
    const filteredByLikes = this.mediaCopy.sort((a, b) => {
      return b.likes - a.likes;
    });

    this.deleteDOM(this);

    filteredByLikes.forEach((media) => {
      const index = filteredByLikes.indexOf(media);
      const templateArticle = new MediaCard(media);
      this.$wrapperMediasContainer.appendChild(
        templateArticle.createMediaCard(index)
      );
    });

    this.$wrapper.style.height = "55px";
    icon.style.transform = "rotate(0deg)";
    toggleIndex--;
  }

  // sort by shooting date
  sortDate(e) {
    e.preventDefault();
    let toggleIndex = 0;
    const chronoOrder = this.mediaCopy.sort((a, b) => {
      return Date.parse(a.date) - Date.parse(b.date);
    });

    this.deleteDOM(this);

    chronoOrder.forEach((media) => {
      const index = chronoOrder.indexOf(media);
      const templateArticle = new MediaCard(media);
      this.$wrapperMediasContainer.appendChild(
        templateArticle.createMediaCard(index)
      );
    });

    this.$wrapper.style.height = "55px";
    icon.style.transform = "rotate(0deg)";
    toggleIndex--;
  }

  // sort in alphabetical order
  sortTitle(e) {
    e.preventDefault();
    let toggleIndex = 0;
    const alphaOrder = this.mediaCopy.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

    this.deleteDOM(this);

    alphaOrder.forEach((media) => {
      const index = alphaOrder.indexOf(media);
      const templateArticle = new MediaCard(media);
      this.$wrapperMediasContainer.appendChild(
        templateArticle.createMediaCard(index)
      );
    });

    this.$wrapper.style.height = "55px";
    icon.style.transform = "rotate(0deg)";
    toggleIndex--;
  }

  createFilterMedia() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "dropdown";

    const filterMedias = `
              <button class="bloc_top">
                <span id="famous">Popularité</span>
                <span id="icon"><i class="fa-solid fa-chevron-down"></i></span>
              </button>
              <div class="bloc_filter" >
                <hr class="separator">
                </hr>
                <span id="date" tabindex="0">Date</span>
                <hr class="separator">
                </hr>
                <span id="title" tabindex="0">Titre</span>
              </div>    
    `;

    this.$wrapper.innerHTML = filterMedias;

    // open and close the dropdown btn
    this.icon = document.querySelector("#icon");
    let toggleIndex = 0;
    this.$wrapper.querySelector(".bloc_top").addEventListener("click", () => {
      if (toggleIndex === 0) {
        this.$wrapper.style.height = "210px";
        icon.style.transform = "rotate(-180deg)";
        toggleIndex++;
      } else {
        this.$wrapper.style.height = "55px";
        icon.style.transform = "rotate(0deg)";
        toggleIndex--;
      }
    });

    /**
     * Eventlistener on id to sort the gallery to click and keyboard
     */
    this.$wrapper
      .querySelector("#famous")
      .addEventListener("click", this.sortFamous.bind(this));

    this.$wrapper.querySelector("#famous").addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        this.sortFamous(e);
      }
    });

    this.$wrapper
      .querySelector("#date")
      .addEventListener("click", this.sortDate.bind(this));

    this.$wrapper.querySelector("#date").addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        this.sortDate(e);
      }
    });

    this.$wrapper
      .querySelector("#title")
      .addEventListener("click", this.sortTitle.bind(this));
    this.$wrapper.querySelector("#title").addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        this.sortTitle(e);
      }
    });

    return this.$wrapper;
  }
}
