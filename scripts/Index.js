// Home page
class Index {
  constructor() {
    this.$photographersSection = document.querySelector(
      ".photographers_section"
    );
    // Call photographer API to create the home page
    this.photographersApi = new PhotographersApi("./data/photographers.json");
  }
  async main() {
    const photographersData = await this.photographersApi.getPhotographers();

    photographersData.map((photographer) => {
      new PhotographersData(photographer);
    });

    photographersData.forEach((photographer) => {
      const template = new PhotographerCard(photographer);
      this.$photographersSection.appendChild(template.createPhotographerCard());
    });
  }

  async init() {
    await this.main();
  }
}

const index = new Index();
index.init();
