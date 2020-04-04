<template>
  <div>
    <b-modal id="addNewEmployee" title="Add Employee">
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Employee ID:"
          label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="user.id"
            type="text"
            required
            :disabled="user.isEdit"
            placeholder="Enter Employee ID">
          </b-form-input>
          <span v-if="submitted && $v.user.id.$error" class="errorMsg">Please Enter Employee ID</span>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Employee Name:"
          label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="user.name"
            type="text"
            required
            placeholder="Enter Employee Name">
          </b-form-input>
          <span v-if="submitted && $v.user.name.$error" class="errorMsg">Please Enter Employee Name</span>
        </b-form-group>
        <b-form-group
          id="input-group-3"
          label="Employee Email:"
          label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="user.email"
            type="email"
            required
            placeholder="Enter Employee Email">
          </b-form-input>
          <div v-if="submitted && $v.user.email.$error" class="errorMsg">
            <span v-if="!$v.user.email.required">Please Enter Email address</span>
            <span v-if="$v.user.email && !$v.user.email.email">Please Enter Valid Email address</span>
          </div>
        </b-form-group>
        <b-form-group
          id="input-group-4"
          label="Employee Contact:"
          label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="user.contact"
            type="text"
            required
            placeholder="Enter Employee Contact">
          </b-form-input>
          <span v-if="submitted && $v.user.contact.$error" class="errorMsg">
            <span v-if="!$v.user.contact.required">Please Enter Contact Number</span>
            <span v-if="!$v.user.contact.minLength">Please Enter Minimum 10 character</span>
            <span v-if="!$v.user.contact.maxLength">Please Enter Maximum 12 character</span>
          </span>
        </b-form-group>
      </b-form>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="danger"
            size="sm"
            class="float-right m-l-10"
            @click="submitForm">
            Save
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="resetForm">
            Cancel
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { BModal, BForm } from 'bootstrap-vue'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'add_new_employee',
  data () {
    return {
      user: {
        id: '',
        name: '',
        email: '',
        contact: ''
      },
      submitted: false
    }
  },
  validations: {
    user: {
      id: { required },
      name: { required },
      email: { required, email },
      contact: { required, minLength: minLength(10), maxLength: maxLength(12) }
    }
  },
  mounted () {
    this.$root.$on('edit-employee', (data) => {
      this.user = data
      this.user.isEdit = true
      this.submitted = false
    })
    this.$root.$on('add-employee', (data) => {
      this.user = {}
      this.user.isEdit = false
      this.submitted = false
    })
  },
  components: {
    'b-modal': BModal,
    'b-form': BForm
  },
  methods: {
    submitForm () {
      this.submitted = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.$bvModal.hide('addNewEmployee')
      this.$store.dispatch('updatelistEmployee', { employee: this.user }) // dispatch store action
    },
    resetForm () {
      this.user = {}
      this.user.isEdit = false
      this.submitted = false
    }
  }
}
</script>

<style>

</style>
