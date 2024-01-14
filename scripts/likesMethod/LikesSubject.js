class LikesSubject {
  constructor() {
    this.observers = [];
  }
  like(observer) {
    this.observers.push(observer);
  }
  dislike(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  fire(action) {
    this.observers.forEach((observer) => observer.update(action));
  }
}
