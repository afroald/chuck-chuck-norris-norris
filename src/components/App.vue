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
            <td v-if="canFavorite">
              <add-to-favorites-button
                  :favorited="favoriteIds.includes(joke.id)"
                  @click.native="addJokeToFavorites(joke)"
              />
            </td>
          </template>
        </joke-table>
      </div>

      <div :class="$style.favorites">
        <h2>Favorites ({{ favorites.length }})</h2>

        <button
            @click="toggleAutomaticFavoriter"
        >
          {{ automaticFavoriterEnabled ? 'Disable' : 'Enable' }} automatic favoriter
        </button>

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
  inject: ['jokeFetcher', 'favoriteRepository'],
  data() {
    return {
      jokes: [],
      favorites: [],
      canFavorite: false,
      automaticFavoriterEnabled: false,
    };
  },
  computed: {
    favoriteIds() {
      return this.favorites.map(joke => joke.id);
    },
  },
  watch: {
    automaticFavoriterEnabled(enabled) {
      if (!enabled && this.timer) {
        clearInterval(this.timer);
      } else {
        this.timer = setInterval(() => {
          this.addRandomJokeToFavorites();
        }, 5000);
      }
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
      this.favoriteRepository.store(joke);
      this.updateFavorites();
    },

    removeJokeFromFavorites(joke) {
      this.favoriteRepository.remove(joke.id);
      this.updateFavorites();
    },

    updateFavorites() {
      this.favorites = this.favoriteRepository.all();
      this.canFavorite = !this.favoriteRepository.isFull();
    },

    toggleAutomaticFavoriter() {
      this.automaticFavoriterEnabled = !this.automaticFavoriterEnabled;
    },

    addRandomJokeToFavorites() {
      if (this.favoriteRepository.isFull()) {
        return;
      }

      this.jokeFetcher.fetchJoke()
        .then((joke) => {
          this.addJokeToFavorites(joke);
        });
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
