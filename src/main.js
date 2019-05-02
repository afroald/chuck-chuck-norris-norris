import Vue from 'vue';
import App from '~/components/App.vue';
import { getJSON } from './getJSON';
import { JokeFetcher } from './JokeFetcher';
import { JokeRepository } from './JokeRepository';

const jokeFetcher = new JokeFetcher('https://api.icndb.com/jokes/random/', getJSON);
const favoritesRepository = new JokeRepository(window.localStorage, 'favorites');

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  provide: () => ({
    jokeFetcher,
    favoritesRepository,
  }),
});
