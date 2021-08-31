import axios from 'axios'

export const employeeService = {
  getListEmployees,
  getEmployeeById
}

function getListEmployees () {
  return axios.get('http://dummy.restapiexample.com/api/v1/employees')
    .then(function (response) {
      // handle success
      return response.data
    })
    .catch(function (error) {
      // handle error
      return error
    })
}

function getEmployeeById (Id) {
  return axios.get(`http://dummy.restapiexample.com/api/v1/employee/${Id}`, {})
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error.response))
}
