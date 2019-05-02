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

  it('removes stored jokes', () => {
    const joke1 = { id: 1, joke: 'TestJoke1' };
    const joke2 = { id: 2, joke: 'TestJoke2' };
    const joke3 = { id: 3, joke: 'TestJoke3' };

    jokeRepository.store(joke1);
    jokeRepository.store(joke2);
    jokeRepository.store(joke3);

    expect(jokeRepository.all().length).toBe(3);

    jokeRepository.remove(2);

    expect(jokeRepository.all().length).toBe(2);
    expect(jokeRepository.all()).toEqual([
      joke1,
      joke3,
    ]);
  });
});
