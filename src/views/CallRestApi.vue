<template>
  <div class="home">
    <h3>Call REST API</h3>
    <div>
      <table class="table table-bordered">
        <tr>
          <td>Employee ID</td>
          <td>Employee Name</td>
          <td>Age</td>
          <td>Salary</td>
        </tr>
        <tr :key="employee.id" v-for="employee in listEmployee">
          <td>{{employee.id}}</td>
          <td>{{employee.employee_name}}</td>
          <td>{{employee.employee_age}}</td>
          <td>{{employee.employee_salary}}</td>
        </tr>
        <tr v-if="listEmployee && listEmployee.length === 0">
          <td colspan="4" class="text-center">No Records Found</td>
        </tr>
      </table>
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
      listEmployee: [],
      isLoading: false
    }
  },
  components: {
    Loading
  },
  created () {
    this.loadEmployees()
  },
  methods: {
    loadEmployees () {
      this.isLoading = true
      employeeService.getListEmployees().then((response) => {
        if (response.data) {
          this.listEmployee = response.data
        }
        setTimeout(() => {
          this.isLoading = false
        }, 500)
      })
    }
  }
}
</script>

<style>

</style>
