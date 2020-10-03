<template>
  <div class="bg-white p-6">
    <div class="edit-office-heading">
      <h1 class="flex-1">{{ headTitle }}</h1>
      <img
        @click="close"
        class="flex-2 cursor-pointer"
        src="~/assets/icons/close.svg"
      />
    </div>
    <div class="form">
      <color-dropdown @update-color="updateColor" :color="form.color" />
      <div>
        <div class="form-group">
          <div class="required" :class="{ 'form-error': $v.form.title.$error }">
            <label for="title">Title</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                id="title"
                class="form-input block w-full pr-12 sm:text-sm sm:leading-5"
                placeholder=""
                v-model.trim="$v.form.title.$model"
              />
            </div>
            <h1 class="error-message">
              {{ getFieldError('title') }}
            </h1>
          </div>
        </div>
        <div class="form-group">
          <div
            class="required"
            :class="{ 'form-error': $v.form.address.$error }"
          >
            <label for="address">Address</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                id="address"
                class="form-input block w-full pr-12 sm:text-sm sm:leading-5"
                placeholder=""
                name="address"
                v-model.trim="$v.form.address.$model"
              />
            </div>
            <h1 class="error-message">
              {{ getFieldError('address') }}
            </h1>
          </div>
        </div>
      </div>
      <div class="bb-white divide-y divide-light-grey">
        <div>
          <h1 class="text-blue pb-4 mt-8 text-sm font-thin">
            CONTACT INFORMATION
          </h1>
        </div>
        <div class="form-group pt-6">
          <div class="required" :class="{ 'form-error': $v.form.name.$error }">
            <label for="name">Full Name</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                id="name"
                class="form-input block w-full pr-12 sm:text-sm sm:leading-5"
                placeholder=""
                name="name"
                v-model.trim="$v.form.name.$model"
              />
            </div>
            <h1 class="error-message">
              {{ getFieldError('name') }}
            </h1>
          </div>
          <div
            class="required"
            :class="{ 'form-error': $v.form.jobPosition.$error }"
          >
            <label for="jobPosition">Job Position</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                id="jobPosition"
                class="form-input block w-full pr-12 sm:text-sm sm:leading-5"
                placeholder=""
                name="jobPosition"
                v-model.trim="$v.form.jobPosition.$model"
              />
            </div>
            <h1 class="error-message">
              {{ getFieldError('jobPosition') }}
            </h1>
          </div>
          <div class="required" :class="{ 'form-error': $v.form.email.$error }">
            <label for="email">Email Address</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                id="email"
                class="form-input block w-full pr-12 sm:text-sm sm:leading-5"
                placeholder="name@example.com"
                name="email"
                v-model.trim="$v.form.email.$model"
              />
            </div>
            <h1 class="error-message">
              {{ getFieldError('email') }}
            </h1>
            <div
              class="required"
              :class="{ 'form-error': $v.form.phone.$error }"
            >
              <label for="phone">Phone</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="phone"
                  class="form-input block w-full pr-12 sm:text-sm sm:leading-5"
                  placeholder="(xxx) xxx-xxxx"
                  name="phone"
                  v-model.trim="$v.form.phone.$model"
                  v-mask="'(###) ###-####'"
                />
              </div>
              <h1 class="error-message">
                {{ getFieldError('phone') }}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          @click="save($event)"
          class="outline-none bg-grey rounded-lg py-2 px-4 text-white"
          :class="{ 'bg-blue': !$v.$invalid }"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
input {
  @apply border text-grey w-full rounded-md pl-2 my-4 py-2;
  @apply outline-none;
}
input:focus {
  @apply border-blue;
}
.edit-office-heading {
  @apply mt-4 mb-6 font-semibold flex text-sm text-dark-blue;
}
.form-error input {
  @apply text-red border-red mb-0;
  background: url(~assets/icons/exclamation-circle.svg) right / contain no-repeat;
  background-size: 35px;
}
.form-group label {
  @apply block text-sm leading-5 font-medium text-dark-blue -mb-2;
}
.form-group .required > label:after {
  content: '*';
  @apply text-grey pl-1;
}
.form-group .error-message {
  @apply text-xs mb-4 pt-1 text-red;
}
</style>
<script>
import ColorDropdown from '@/components/colorDropdown'
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
import VueMask from 'v-mask'
import Vue from 'vue'
Vue.use(VueMask)

export default {
  mixins: [validationMixin],
  components: { ColorDropdown },
  props: {
    id: Number,
    title: String,
    address: String,
    name: String,
    color: String,
    jobPosition: String,
    email: String,
    phone: String,
    edit: Boolean,
  },
  data() {
    return {
      form: {
        id: this.id,
        title: this.title,
        address: this.address,
        color: this.color,
        name: this.name,
        jobPosition: this.jobPosition,
        email: this.email,
        phone: this.phone,
      },
    }
  },
  computed: {
    headTitle() {
      return `${this.form.id === 0 ? 'New' : 'Edit'} Location`
    },
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(4),
      },
      title: {
        required,
        minLength: minLength(6),
      },
      address: {
        required,
        minLength: minLength(4),
      },
      jobPosition: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
        minLength: minLength(14),
      },
    },
  },
  methods: {
    updateColor(color) {
      this.form.color = color
    },
    close() {
      this.$emit('close-office')
    },
    save(event) {
      this.$v.$touch()
      if (this.$v.$invalid) {
        event.preventDefault()
        return
      }
      this.$emit('save-office', this.form)
      this.close()
    },
    getFieldError(fieldName) {
      const field = this.$v.form[fieldName]
      const { $params, $dirty } = field
      const messages = {
        required: params => 'This field cannot be empty',
        email: params => 'This email is invalid',
        minLength: ({ min }) => `This field must have al least ${min} letters`,
      }
      for (const param of Object.keys($params)) {
        if (!field[param] && $dirty) {
          return messages[param]($params[param])
        }
      }
    },
  },
}
</script>
