// https://api.icndb.com/jokes/random/

export function JokeFetcher(apiUrl, getJSON) {
  this.fetchJokes = async function fetchJokes(numJokes) {
    const data = await getJSON(`${apiUrl}/${numJokes}`);
    return data.value.map(joke => ({
      id: joke.id,
      joke: joke.joke,
    }));
  };

  this.fetchJoke = async function fetchJoke() {
    const [joke] = await this.fetchJokes(1);
    return joke;
  };
}
