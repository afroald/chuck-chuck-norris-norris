export function JokeRepository(storage, prefix = 'default') {
  const storageKey = `jokes-${prefix}`;
  let jokes = [];

  /* PRIVATE */
  function load() {
    const jsonString = storage.getItem(storageKey);

    if (!jsonString) {
      return;
    }

    jokes = JSON.parse(jsonString);
  }

  function persist() {
    storage.setItem(storageKey, JSON.stringify(jokes));
  }

  /* PUBLIC */
  this.store = function store(joke) {
    if (this.has(joke.id)) {
      const existingJoke = this.get(joke.id);
      const existingJokeIndex = jokes.indexOf(existingJoke);
      jokes.splice(existingJokeIndex, 1, joke);
    } else {
      jokes.push(joke);
    }
    persist();
  };

  this.get = function get(id) {
    return jokes.find(joke => joke.id === id);
  };

  this.all = function all() {
    return jokes;
  };

  this.has = function has(id) {
    return jokes.map(joke => joke.id).includes(id);
  };

  this.remove = function remove(id) {
    const jokeToRemove = this.get(id);

    if (!jokeToRemove) {
      return;
    }

    const jokeToRemoveIndex = jokes.indexOf(jokeToRemove);
    jokes.splice(jokeToRemoveIndex, 1);
    persist();
  };

  /* INITIALIZING */
  load();
}
