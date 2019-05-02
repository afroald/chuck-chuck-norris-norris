import Vue from 'vue';
import App from '~/components/App.vue';
import { getJSON } from './getJSON';
import { JokeFetcher } from './JokeFetcher';
import { JokeRepository } from './JokeRepository';
import { FavoriteRepository } from './FavoriteRepository';

const jokeFetcher = new JokeFetcher('https://api.icndb.com/jokes/random/', getJSON);
const favoriteRepository = new FavoriteRepository(
  new JokeRepository(window.localStorage, 'favorites'),
);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  provide: () => ({
    jokeFetcher,
    favoriteRepository,
  }),
});
