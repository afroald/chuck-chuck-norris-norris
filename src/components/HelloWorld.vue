<template>
  <div>Hello World: {{ message }}</div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'default',
    },
  },
};
</script>
