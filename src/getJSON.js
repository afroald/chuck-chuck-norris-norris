export function getJSON(...args) {
  return fetch(...args)
    .then(response => response.json());
}
