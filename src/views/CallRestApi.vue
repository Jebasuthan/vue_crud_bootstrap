<template>
  <div class="home">
    <h3>Call REST API</h3>
    <div>
      <b-table
        striped
        hover
        :items="listItems"
        :fields="fields"
        :current-page="currentPage"
        :per-page="0">
        <template v-slot:cell(action)="data">
          <b-button size="sm" class="mr-1" @click="edit(data)">
            Edit
          </b-button>
          <b-button size="sm" @click="deleteRecord(data)">
            Delete
          </b-button>
        </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalPages"
          :per-page="recordsPerPage">
        </b-pagination>
        <loading :active.sync="isLoading"
          :can-cancel="true"
          :is-full-page="true"></loading>
    </div>
  </div>
</template>

<script>
import { employeeService } from '../service/employeeservice'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'call_rest_api',
  data () {
    return {
      listItems: [],
      currentPage: 1,
      totalPages: 0,
      recordsPerPage: 10,
      isLoading: false,
      fields: [
        {
          key: '_id', label: 'ID', sortable: true, sortDirection: 'desc'
        },
        {
          key: 'name', label: 'Passenger Name', sortable: true, class: 'text-center'
        },
        {
          key: 'airline[0].name', label: 'Aireline Name', sortable: true, image: true
        },
        {
          key: 'airline[0].country', label: 'Country', sortable: true
        },
        {
          key: 'action', label: 'Actions'
        }
      ],
      params: ''
    }
  },
  components: {
    Loading
  },
  created () {
    this.loadPassengers()
  },
  watch: {
    currentPage: {
      handler: function (value) {
        this.params = `page=${value}&size=${this.recordsPerPage}`
        this.loadPassengers()
      }
    }
  },
  methods: {
    loadPassengers () {
      this.isLoading = true
      this.params = `page=${this.currentPage}&size=${this.recordsPerPage}`
      employeeService.getListPassengers(this.params).then((response) => {
        if (response.data) {
          this.listItems = response.data
          this.totalPages = response.totalPassengers
          this.isLoading = false
        }
      })
    },
    deleteRecord (data) {
      this.$bvModal.msgBoxConfirm('Are you sure wants to delete?', {
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
            this.listItems.splice(data.index, 1)
          }
        })
    },
    edit (data) {
      alert(JSON.stringify(data))
    }
  }
}
</script>

<style>

</style>
