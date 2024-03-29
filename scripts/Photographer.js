/**
 * id = photographer.id
 */
let id = new URLSearchParams(document.location.search).get("id");

// Photographer page
class Photographer {
  constructor() {
    this.$Main = document.querySelector("#main");
    this.$modalWrapperLightbox = document.querySelector(".modal_lightbox");

    this.PhotographersApi = new PhotographersApi("./data/photographers.json");
    this.MediasApi = new MediasApi("./data/photographers.json");

    // Call photographer API to display datas on photographer page
    this.photographer = async () => {
      const photographersData = await this.PhotographersApi.getPhotographers();

      photographersData.map((photographer) => {
        new PhotographersData(photographer);
      });

      const photographerIndex = photographersData.findIndex(
        (photographer) => id == photographer.id
      );
      const photographer = photographersData[photographerIndex];
      return photographer;
    };

    // Call media API to display datas on photographer page
    this.medias = async () => {
      const mediasData = await this.MediasApi.getMedias();

      mediasData.map((media) => {
        new MediasData(media);
      });

      const mediasFiltered = mediasData.filter(
        (media) => id == media.photographerId
      );

      return mediasFiltered;
    };
  }

  // create photographer section
  async aboutPhotographer() {
    const photographer = await this.photographer();
    const aboutPhotographer = document.querySelector(".photographer");
    const templateAbout = new PhotographerAbout(photographer);
    aboutPhotographer.appendChild(templateAbout.createPhotographerAbout());
  }

  // create dropdow filter
  async filterMedias() {
    const mediasFiltered = await this.medias();
    const filterMedias = document.querySelector(".filter");
    const templateFilter = new MediasFilter(mediasFiltered);
    filterMedias.appendChild(templateFilter.createFilterMedia());
  }

  // create a medias gallery per photographer
  async galleryMedias() {
    const mediasFiltered = await this.medias();
    const mediasContainer = document.querySelector(".medias_container");

    mediasFiltered.forEach((media) => {
      const index = mediasFiltered.indexOf(media);
      const templateArticle = new MediaCard(media);
      mediasContainer.appendChild(templateArticle.createMediaCard(index));
    });
  }

  // create a likes counter
  async likesBlock() {
    const mediasFiltered = await this.medias();
    const blockLikesPrice = document.querySelector(".block_likes_price");
    const templateLikes = new MediaLikes(mediasFiltered);
    blockLikesPrice.appendChild(templateLikes.getLikes());
  }
  // display the photographer's rate
  async priceBlock() {
    const photographer = await this.photographer();
    const blockLikesPrice = document.querySelector(".block_likes_price");
    const templatePrice = new PhotographerPrice(photographer);
    blockLikesPrice.appendChild(templatePrice.getPrice());
  }

  async init() {
    await this.aboutPhotographer();
    await this.filterMedias();
    await this.galleryMedias();
    await this.likesBlock();
    await this.priceBlock();
  }
}

const photographer = new Photographer();
photographer.init();
