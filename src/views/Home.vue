<template>
  <div class="home">
    <h3 class="heading">Employee Management</h3>
    <div>
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Sort"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="sortBySelect"
            class="mb-0">
            <b-input-group size="sm">
              <b-form-select v-model="sortBy" id="sortBySelect" :options="sortOptions" class="w-75">
                <template v-slot:first>
                  <option value="">Select</option>
                </template>
              </b-form-select>
              <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col lg="2" class="my-1">
        </b-col>
        <b-col lg="4" class="my-1">
          <b-form-group
            label="Initial sort"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="initialSortSelect"
            class="mb-0">
            <b-form-select
              v-model="sortDirection"
              id="initialSortSelect"
              size="sm"
              :options="['asc', 'desc', 'last']">
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Filter"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0">
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col lg="2" class="my-1">
        </b-col>
        <b-col lg="4" class="my-1">
          <b-form-group
            label="Filter On"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            description="Leave all unchecked to filter on all data"
            class="mb-0">
            <b-form-checkbox-group v-model="filterOn" class="mt-1">
              <b-form-checkbox value="id">ID</b-form-checkbox>
              <b-form-checkbox value="name">Name</b-form-checkbox>
              <b-form-checkbox value="email">Email</b-form-checkbox>
              <b-form-checkbox value="contact">Contact</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0">
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </div>
    <div style="float:right;margin:10px;">
      <b-button size="sm" @click="addEmployee">Add New Employee</b-button>
    </div>
    <b-table striped hover :items="bindListEmployees" responsive="sm" :fields="fields" show-empty
      :current-page="currentPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :per-page="perPage"
      @filtered="onFiltered">
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
    <b-col sm="3" md="3" class="my-1 float-right">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="fill"
        size="sm"
        class="my-0">
      </b-pagination>
    </b-col>
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
      fields: [
        {
          key: 'id', label: 'Employee ID', sortable: true, sortDirection: 'desc'
        },
        {
          key: 'name', label: 'Employee Name', sortable: true, class: 'text-center'
        },
        {
          key: 'email', label: 'Email', sortable: true
        },
        {
          key: 'contact', label: 'Contact', sortable: true
        },
        {
          key: 'action', label: 'Actions'
        }
      ],
      currentPage: 1,
      totalRows: 0,
      perPage: 2,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      pageOptions: [2, 5, 10, 15]
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },
    bindListEmployees () {
      return this.$store.state.listEmployee
    }
  },
  watch: {
    bindListEmployees: {
      deep: true,
      handler: function (list) {
        this.totalRows = list.length
      }
    }
  },
  created () {
    this.loadlistEmployees()
  },
  methods: {
    loadlistEmployees () {
      this.totalRows = this.$store.state.listEmployee.length
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
        size: 'mm',
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
            this.$store.dispatch('deleteStoreEmployee', { employee: employee }) // dispatch store action
          }
        })
        .catch((err) => {
          console.log('err', err)
          // An error occurred
        })
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
