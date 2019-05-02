/* eslint-env jest */

import localStorageMemory from 'localstorage-memory';
import { JokeRepository } from '../JokeRepository';

describe('JokeRepository', () => {
  let jokeRepository;

  beforeEach(() => {
    jokeRepository = new JokeRepository(localStorageMemory);
  });

  afterEach(() => {
    localStorageMemory.clear();
  });

  it('stores jokes', () => {
    const joke = {
      id: 1,
      joke: 'TestJoke1',
    };


    jokeRepository.store(joke);
    expect(jokeRepository.get(1)).toEqual(joke);
  });

  it('won\'t store duplicates', () => {
    const joke = {
      id: 1,
      joke: 'TestJoke1',
    };

    jokeRepository.store(joke);
    jokeRepository.store(joke);
    jokeRepository.store(joke);

    expect(jokeRepository.all().length).toBe(1);
  });
});
