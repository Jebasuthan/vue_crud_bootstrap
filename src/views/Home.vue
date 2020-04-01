<template>
  <div class="home">
    <div style="float:right;margin:10px;">
      <button @click="addEmployee">Add New Employee</button>
    </div>
    <b-table striped hover :items="items" responsive="sm" :fields="fields" show-empty>
      <template v-slot:cell(action)="data">
        <b-button size="sm" class="mr-1" @click="editEmployee(data)">
          Edit
        </b-button>
        <b-button size="sm" @click="deleteEmployee(data)">
          Delete
        </b-button>
      </template>
      <template v-slot:cell(name)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <a :href="`#${data.value.replace(/[^a-z]+/i,'-').toLowerCase()}`">{{ data.value }}</a>
      </template>
    </b-table>
    <AddEmployee />
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue'
import AddEmployee from './AddEmployee.vue'

export default {
  name: 'Home',
  components: {
    'b-table': BTable,
    AddEmployee
  },
  data () {
    return {
      items: [],
      fields: [
        {
          key: 'id', label: 'Employee ID', sortable: true, sortDirection: 'desc'
        },
        {
          key: 'name', label: 'Employee Name', sortable: true, class: 'text-center'
        },
        {
          key: 'email', label: 'Email'
        },
        {
          key: 'contact', label: 'Contact'
        },
        {
          key: 'action', label: 'Actions'
        }
      ]
    }
  },
  created () {
    this.loadlistEmployees()
  },
  mounted () {
    this.$root.$on('add-employee-details', (data) => {
      if (!data.isEdit) {
        this.items.push(data)
      } else {
        const editEmp = this.items.find((item) => { return item.id === data.id })
        editEmp.name = data.name
        editEmp.email = data.email
        editEmp.contact = data.contact
      }
    })
  },
  methods: {
    loadlistEmployees () {
      this.items = [
        {
          id: '001',
          name: 'Jeba',
          email: 'jeba@gmail.com',
          contact: '92434334343'
        },
        {
          id: '002',
          name: 'Maneesha',
          email: 'maneesha@gmail.com',
          contact: '9887878787'
        },
        {
          id: '003',
          name: 'Martin',
          email: 'martin@gmail.com',
          contact: '8787723222'
        }
      ]
    },
    addEmployee () {
      this.$root.$emit('add-employee', {})
      this.$bvModal.show('addNewEmployee')
    },
    editEmployee (employee) {
      this.$root.$emit('edit-employee', Object.assign({}, employee.item))
      this.$bvModal.show('addNewEmployee')
    },
    deleteEmployee (employee) {
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete employee.', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then((value) => {
          if (value) {
            this.items.splice(employee.index, 1)
          }
        })
        .catch((err) => {
          console.log('err', err)
          // An error occurred
        })
    }
  }
}
</script>
