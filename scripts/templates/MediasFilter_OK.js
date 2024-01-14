// This script works good 👍
class MediasFilter {
  constructor(media) {
    this._media = media;
    this.mediaCopy = this._media;

    this.$wrapperMediasContainer = document.querySelector(".medias_container");

    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "filter_medias";
  }

  deleteDOM() {
    this.$wrapperMediasContainer.innerHTML = "";
  }

  sortedMedias(e) {
    e.preventDefault();
    const sorter = e.target.value;
    console.log("changeSorter", sorter);

    if (e.target.value === "TITLE") {
      const alphaOrder = this.mediaCopy.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
      console.log(alphaOrder);
      this.deleteDOM(this);

      alphaOrder.forEach((media) => {
        const templateArticle = new MediaCard(media);
        this.$wrapperMediasContainer.appendChild(
          templateArticle.createMediaCard()
        );
      });
    } else if (e.target.value === "FAMOUS") {
      const filteredByLikes = this.mediaCopy.sort((a, b) => {
        return a.likes - b.likes;
      });
      console.log(filteredByLikes);
      this.deleteDOM(this);

      filteredByLikes.forEach((media) => {
        const templateArticle = new MediaCard(media);
        this.$wrapperMediasContainer.appendChild(
          templateArticle.createMediaCard()
        );
      });
    } else if (e.target.value === "DATE") {
      const chronoOrder = this.mediaCopy.sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date);
      });
      console.log(chronoOrder);
      this.deleteDOM(this);

      chronoOrder.forEach((media) => {
        const templateArticle = new MediaCard(media);
        this.$wrapperMediasContainer.appendChild(
          templateArticle.createMediaCard()
        );
      });
    }
  }

  createFilterMedia() {
    const filterMedias = `
      <form action=# method="POST" class="filter"
      <label for="filterBy filter_label"> Trier par </label>
        <select name="filterBy filter_btn" id="filterBy">
          <option value="TITLE">Titre</option>
          <option value="FAMOUS">Popularité</option>
          <option value="DATE">Date</option>
        </select>
      </form>
      `;

    this.$wrapper.innerHTML = filterMedias;

    this.$wrapper
      .querySelector("form")
      .addEventListener("change", this.sortedMedias.bind(this));

    return this.$wrapper;
  }
}
