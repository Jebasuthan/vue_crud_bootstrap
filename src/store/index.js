import Vue from 'vue'
import Vuex from 'vuex'
import { setLocalStorage, getLocalStorage } from '@/core/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listEmployee: getLocalStorage('employeeList') ? getLocalStorage('employeeList') : []
  },
  mutations: {
    updateEmployee (state, employee) {
      if (!employee.isEdit) {
        state.listEmployee.push(employee)
      } else {
        const editEmp = state.listEmployee.find((item) => { return item.id === employee.id })
        editEmp.name = employee.name
        editEmp.email = employee.email
        editEmp.contact = employee.contact
      }
      setLocalStorage('employeeList', state.listEmployee)
    },
    deleteEmployee (state, employee) {
      state.listEmployee.splice(employee.index, 1)
      setLocalStorage('employeeList', state.listEmployee)
    }
  },
  actions: {
    updatelistEmployee ({ commit }, data) {
      commit('updateEmployee', data.employee)
    },
    deleteStoreEmployee ({ commit }, data) {
      commit('deleteEmployee', data.employee)
    }
  },
  modules: {
  }
})
