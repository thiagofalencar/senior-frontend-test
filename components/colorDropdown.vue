<template>
  <div class="overflow-hidden">
    <div class="rounded-lg">
      <div
        :class="[`dropdown-container bg-${selected}`]"
        @click="collapsed = !collapsed"
      >
        <div class="">
          <h1 class="flex justify-center">
            <h1 class="">Select Color</h1>
            <div
              class="ml-2 w-4 transform ease-in duration-100"
              :class="{ 'rotate-180': this.collapsed }"
            >
              <img src="~/assets/icons/arrow-up.svg" class="w-5 h-5" />
            </div>
          </h1>
        </div>
      </div>
      <div
        :class="[
          'relative transform shadow-lg duration-500 z-0',
          collapsed ? '-mt-128 opacity-0' : 'opacity-100',
        ]"
      >
        <div
          v-for="option in options"
          :key="option.color"
          :class="[`dropdown-item bg-${option}`]"
          @click="setColor(option)"
        >
          <img
            src="~/assets/icons/flag-ok.svg"
            class="flex-1 text-center h-8"
            v-if="option === selected"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.dropdown-container {
  @apply relative z-10 shadow-lg cursor-pointer h-24 mb-4 text-center text-white rounded-lg py-8;
}
.dropdown-item {
  @apply flex pt-8 cursor-pointer h-24 mb-4 text-center text-white rounded-lg;
}
.dropdown-head {
  @apply -mt-2 mb-6 font-semibold flex;
}
</style>
<script>
export default {
  data() {
    return {
      selected: this.color,
      collapsed: true,
      options: ['dark-blue', 'light-grey', 'grey', 'blue', 'red', 'yellow'],
    }
  },
  props: {
    color: String,
  },
  methods: {
    setColor: function(color) {
      this.collapsed = true
      this.selected = color
      this.$emit('update-color', color)
    },
  },
}
</script>
