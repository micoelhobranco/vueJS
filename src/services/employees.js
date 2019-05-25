import { http } from './config'

export default {

listar: () => {
    return http.get('employees')
},

salvar: (employee) => {
    return http.post('employee', employee)
},

atualizar: (employee) => {
    return http.put('employee', employee)
},

apagar: (employee) => {
    return http.delete('employee', { data: employee})
},

buscar: (employee) => {
    return http.get('employees')
}

}