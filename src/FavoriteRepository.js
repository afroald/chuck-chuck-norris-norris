export function FavoriteRepository(jokeRepository) {
  this.isFull = function isFull() {
    return this.all().length >= 10;
  };

  return new Proxy(this, {
    get(object, property) {
      if (jokeRepository[property]) {
        return jokeRepository[property];
      }

      return object[property];
    },
  });
}
