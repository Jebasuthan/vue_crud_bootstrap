<template>
  <div>
    <b-modal id="addNewEmployee" title="Add Employee" @ok="submitForm">
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
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { BModal, BForm } from 'bootstrap-vue'

export default {
  name: 'add_new_employee',
  data () {
    return {
      user: {
        id: '',
        name: '',
        email: '',
        contact: ''
      }
    }
  },
  mounted () {
    this.$root.$on('edit-employee', (data) => {
      this.user = data
      this.user.isEdit = true
    })
    this.$root.$on('add-employee', (data) => {
      this.user = {}
      this.user.isEdit = false
    })
  },
  components: {
    'b-modal': BModal,
    'b-form': BForm
  },
  methods: {
    submitForm () {
      if (!this.user.id) {
        return false
      }
      this.$root.$emit('add-employee-details', this.user)
      return true
    }
  }
}
</script>

<style>

</style>
