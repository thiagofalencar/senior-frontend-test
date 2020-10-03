<template>
  <div>
    <div
      class="notification"
      :class="[this.notification ? 'mt-0 opacity-100' : '-mt-20 opacity-0']"
    >
      <svg viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.6665 17.5618L11.9998 22.8952L25.3332 9.56183"
          stroke="green"
          stroke-width="2.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <h1>THE LOCATION HAS BEEN UPDATED</h1>
      <img
        @click="closeNotification"
        class="close-icon"
        src="~/assets/icons/close.svg"
      />
    </div>
    <add-office-button v-if="showAddOffice" @add-office="addOffice" />
    <office-card
      v-for="office in list"
      v-bind="office"
      :key="office.data.id"
      :edit="office.meta.edit"
      @save-office="saveOffice"
      @remove-office="removeOffice"
      @reload-office="reloadOfficesList"
      @show-add-office="addOfficeVisibility"
      @set-edit-office="setEditOffice"
    />
  </div>
</template>
<style scoped>
.close-icon {
  @apply cursor-pointer mt-8 mr-8 w-4 absolute inset-y-0 right-0;
}
.notification {
  @apply fixed w-screen bg-white h-20 flex justify-center top-0 inset-x-0 transform shadow-lg duration-700 z-20;
}
.notification > h1 {
  @apply text-xs my-auto ml-4 text-grey;
}
.notification svg {
  @apply -ml-6 my-auto mt-6 pt-1 h-8;
}
.notification svg {
  @apply -ml-6 my-auto mt-6 pt-1 h-8;
}
</style>
<script>
import OfficeCard from '@/components/officeCard'
import addOfficeButton from '@/components/addOfficeButton'
import officesMock from '@/assets/js/officesMock'

let offices = [...officesMock]

export default {
  components: { OfficeCard, addOfficeButton },
  data() {
    return {
      showAddOffice: true,
      list: [...offices],
      notification: false,
    }
  },
  watch: {
    list(items) {
      let showAddOffice = true
      items.forEach(({ meta: { edit } }) => {
        if (edit === true) {
          showAddOffice = false
        }
      })
      this.showAddOffice = showAddOffice
    },
  },
  methods: {
    showNotification() {
      this.notification = true
    },
    closeNotification() {
      this.notification = false
    },
    setEditOffice(office) {
      const { data } = office
      this.list = this.list.map(item => {
        const {
          data: { id },
        } = item
        return id === data.id ? office : item
      })
    },
    addOfficeVisibility(show) {
      this.showAddOffice = show
    },
    removeOffice(office) {
      offices = offices.filter(({ data: { id } }) => id !== office.id)
      this.reloadOfficesList()
    },
    reloadOfficesList() {
      this.list = offices
    },
    saveOffice(office) {
      if (office.id === 0) {
        offices = [
          {
            data: { ...office, id: offices.length + 1 },
            meta: { edit: false, preview: false },
          },
          ...offices,
        ]
      } else {
        offices = offices.map(item => {
          if (item.data.id === office.id) {
            return {
              data: office,
              meta: { edit: false, preview: false },
            }
          }
          return item
        })
      }
      this.showNotification()
      this.reloadOfficesList()
    },
    addOffice() {
      const blank = {
        data: {
          id: 0,
          title: '',
          name: '',
          jobPosition: '',
          email: '',
          address: '',
          phone: '',
          color: 'yellow',
        },
        meta: { edit: true, preview: false },
      }
      this.list = [blank, ...this.list]
    },
  },
}
</script>
