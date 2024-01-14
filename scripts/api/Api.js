class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
  }

  async get() {
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => eval(res))
      .catch((err) => console.log("an error occurs", err));
  }
}
class PhotographersApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getPhotographers() {
    const data = await this.get();
    const photographersData = data["photographers"];
    return photographersData;
  }
}

class MediasApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getMedias() {
    const data = await this.get();
    const mediasData = data["media"];
    return mediasData;
  }
}
