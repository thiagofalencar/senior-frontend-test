<template>
  <button @click="add">
    <h1 class="text-left text-white w-10/12 text-lg font-thin">
      Add new locations
    </h1>
    <img class="flex-2 mt-1 ml-4 h-4" src="~/assets/icons/plus.svg" />
  </button>
</template>
<style scoped>
button {
  @apply bg-red w-full flex shadow-md rounded-lg text-light-grey;
  @apply py-4 pl-8 outline-none;
}
</style>
<script>
export default {
  data: () => ({}),
  methods: {
    add() {
      this.$emit('add-office')
    },
  },
}
</script>
