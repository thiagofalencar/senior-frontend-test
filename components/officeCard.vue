<template>
  <div class="card shadown">
    <div :class="{ hidden: this.edit }">
      <div
        :class="[
          `office-preview bg-${office.color}`,
          this.edit ? 'opacity-0' : 'opacity-100',
        ]"
        @click="showPreview"
      >
        <div class="flex-1">
          <h4 class="text-2xl text-white font-semibold">{{ office.title }}</h4>
          <h1 class="text-white font-thin">{{ office.address }}</h1>
        </div>
        <div
          class="flex-2 transform ease-in duration-500 h-5 mt-8"
          :class="{ 'rotate-180': this.preview }"
        >
          <img class="w-5 h-5" src="~/assets/icons/arrow-up.svg" />
        </div>
      </div>
    </div>
    <div
      class="relative z-0 rounded-b-lg -mt-2 bg-white transform duration-500"
      :class="{ 'h-56': !this.edit, '-mt-56': !this.preview }"
    >
      <div
        :class="[
          'divide-y divide-light-grey pt-6 px-6 transform duration-300',
          this.preview ? 'opacity-100' : 'opacity-0',
        ]"
      >
        <div class="pb-4">
          <h3 class="text-xl font-sans text-dark-blue h-8">
            {{ office.name }}
          </h3>
          <h1 class="py-1 font-light  text-sm h-8">{{ office.jobPosition }}</h1>
          <h1 class="py-1 h-8 font-light text-sm text-blue">
            {{ office.email }}
          </h1>
          <h1 class="py-1 h-8 text-dark-blue">{{ office.phone }}</h1>
        </div>
        <div class="flex justify-between my-0">
          <div
            class="flex justify-between cursor-pointer mt-3"
            @click="editOffice"
          >
            <img class="h-5" src="~/assets/icons/pencil.svg" />
            <h1 class="pl-3 text-sm font-thin text-grey ">EDIT</h1>
          </div>
          <div class="flex justify-between cursor-pointer mt-3">
            <img class="h-5" src="~/assets/icons/trash.svg" />
            <h1 @click="removeOffice" class="ml-3 text-sm font-thin text-red">
              DELETE
            </h1>
          </div>
        </div>
      </div>
    </div>
    <edit-office-card
      v-if="this.edit"
      v-bind="this.office"
      @close-office="closeOffice"
      @save-office="saveOffice"
    />
  </div>
</template>
<style scoped>
.card {
  @apply relative shadow-lg overflow-hidden rounded-lg my-6 w-full;
}
button {
  @apply outline-none;
}
input {
  @apply border text-grey w-full rounded-md pl-2 my-4 py-2 outline-none;
}
label {
  @apply;
}
input:focus {
  @apply border-blue;
}
.office-preview {
  @apply relative z-10 cursor-pointer flex rounded-lg py-6 pl-6 pr-6 shadow transform duration-300;
}
</style>
<script>
import ColorDropdown from '@/components/colorDropdown'
import EditOfficeCard from '@/components/editOfficeCard'

export default {
  components: { EditOfficeCard, ColorDropdown },
  props: {
    meta: Object,
    data: Object,
  },
  data: function() {
    return {
      office: { ...this.data },
      edit: this.meta.edit,
      preview: this.meta.preview,
    }
  },
  methods: {
    editOffice: function() {
      this.preview = false
      this.setEdit(true)
    },
    closeOffice() {
      this.preview = false
      this.setEdit(false)
      if (this.office.id === 0) {
        this.$emit('remove-office', this.office)
      }
      this.$emit('reload-office')
    },
    setEdit(status) {
      const { preview, data } = this
      this.edit = status
      this.$emit('set-edit-office', {
        data,
        meta: { edit: status, preview },
      })
    },
    showPreview() {
      this.preview = !this.preview
    },
    removeOffice() {
      this.$emit('remove-office', this.office)
    },
    saveOffice(office) {
      this.office = office
      this.$emit('save-office', office)
    },
  },
}
</script>
