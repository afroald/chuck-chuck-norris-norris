<template>
  <button>{{ label }}</button>
</template>

<script>
export default {
  props: {
    favorited: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    label() {
      return this.favorited ? '✅' : '⭐️';
    },
  },
};
</script>
