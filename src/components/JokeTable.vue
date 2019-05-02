<template>
  <table :class="$style.jokeTable">
    <tbody>
      <template v-if="jokes.length > 0">
        <tr
            v-for="joke in jokes"
            :key="joke.id"
        >
          <slot
              name="row"
              :joke="joke"
          >
            <td>{{ joke.joke }}</td>
          </slot>
        </tr>
      </template>
      <tr v-else>
        <td>Geen inhoud</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    jokes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" module>
.jokeTable {
  margin: 20px 0;
  border-spacing: 0;
  border-collapse: collapse;

  td {
    padding: 3px;
    border: 1px solid black;
  }
}
</style>
