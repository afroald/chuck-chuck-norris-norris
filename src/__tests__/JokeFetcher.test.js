/* eslint-env jest */

import { JokeFetcher } from '../JokeFetcher';

describe('JokeFetcher', () => {
  it('fetches a number of jokes', async () => {
    const mockGetJSON = jest.fn(() => ({
      value: [
        { id: 1, joke: 'TestJoke1' },
        { id: 2, joke: 'TestJoke2' },
        { id: 3, joke: 'TestJoke3' },
      ],
    }));
    const fetcher = new JokeFetcher('anyUrl', mockGetJSON);
    const jokes = await fetcher.fetchJokes(3);

    expect(jokes).toBeInstanceOf(Array);
    expect(jokes.length).toBe(3);
    jokes.forEach(joke => expect(joke).toEqual(expect.objectContaining({
      id: expect.any(Number),
      joke: expect.any(String),
    })));
  });

  it('fetches a single joke', async () => {
    const mockGetJSON = jest.fn(() => ({
      value: [
        { id: 1, joke: 'TestJoke1' },
      ],
    }));
    const fetcher = new JokeFetcher('anyUrl', mockGetJSON);
    const joke = await fetcher.fetchJoke();
    expect(joke).toEqual(expect.objectContaining({
      id: expect.any(Number),
      joke: expect.any(String),
    }));
  });
});
