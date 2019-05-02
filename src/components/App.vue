<template>
  <div>
    <h1>Chuck Norris jokes</h1>

    <div :class="$style.content">
      <div :class="$style.randomJokes">
        <h2>Jokes</h2>
        <button @click="loadJokes">
          Load 10 random jokes
        </button>

        <joke-table :jokes="jokes">
          <template v-slot:row="{ joke }">
            <td>{{ joke.joke }}</td>
            <td>
              <add-to-favorites-button
                  :favorited="favoriteIds.includes(joke.id)"
                  @click.native="addJokeToFavorites(joke)"
              />
            </td>
          </template>
        </joke-table>
      </div>

      <div :class="$style.favorites">
        <h2>Favorites</h2>
        <joke-table :jokes="favorites">
          <template v-slot:row="{ joke }">
            <td>{{ joke.joke }}</td>
            <td>
              <button
                  @click="removeJokeFromFavorites(joke)"
              >
                ❌
              </button>
            </td>
          </template>
        </joke-table>
      </div>
    </div>
  </div>
</template>

<script>
import AddToFavoritesButton from './AddToFavoritesButton.vue';
import JokeTable from './JokeTable.vue';

export default {
  components: { AddToFavoritesButton, JokeTable },
  inject: ['jokeFetcher', 'favoritesRepository'],
  data() {
    return {
      jokes: [],
      favorites: [],
    };
  },
  computed: {
    favoriteIds() {
      return this.favorites.map(joke => joke.id);
    },
  },
  created() {
    this.updateFavorites();
  },
  methods: {
    loadJokes() {
      this.jokeFetcher.fetchJokes(10)
        .then((jokes) => {
          this.jokes = jokes;
        });
    },

    addJokeToFavorites(joke) {
      this.favoritesRepository.store(joke);
      this.updateFavorites();
    },

    removeJokeFromFavorites(joke) {
      this.favoritesRepository.remove(joke.id);
      this.updateFavorites();
    },

    updateFavorites() {
      this.favorites = this.favoritesRepository.all();
    },
  },
};
</script>

<style lang="scss" module>
.content {
  display: flex;
}

.randomJokes {
  width: 500px;
}

.favorites {
  width: 500px;
}
</style>

<style lang="scss">
html {
  font-family: 'Arial', sans-serif;
}
</style>
