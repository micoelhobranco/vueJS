<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper #1e88e5 blue darken-1">
        <a href="#" class="brand-logo center">Funcionários Front</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for = "(erro, index) of errors" :key= "index">
          campo <b> {{ erro.field }} </b> - {{ erro.defaultMessage }}
        </li>
      </ul>

      <form @submit.prevent = "salvar"> 



<div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">account_circle</i>
          <input placeholder="Nome" id="icon_prefix" type="text" class="validate" v-model = "employee.nome">
          <label for="icon_prefix"></label>
        </div>
      </div>
       </form>
  </div>


 <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <i class="material-icons prefix">assignment_ind</i>
          <input placeholder="Cargo" id="icon_prefix" type="text" class="validate" v-model = "employee.cargo">
          <label for="icon_prefix"></label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">picture_in_picture</i>
          <input placeholder="CPF" id="icon_telephone" type="number" class="validate" v-model = "employee.cpf">
          <label for="icon_telephone"></label>
        </div>
      </div>
    </form>
  </div>

  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <i class="material-icons prefix">local_atm</i>
          <input placeholder="Salario" id="icon_prefix" type="text" class="validate" v-model = "employee.salario">
          <label for="icon_prefix"></label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">offline_pin</i>
          <input placeholder="Status" id="icon_telephone" type="text" class="validate" v-model = "employee.status">
         <label for="icon_telephone"></label>
        </div>
      </div>
    </form>
  </div>

  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <i class="material-icons prefix">location_on</i>
          <input placeholder="UF Nascimento" id="icon_prefix" type="text" class="validate" v-model = "employee.ds_uf">
          <label for="icon_prefix"></label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">date_range</i>
          <input placeholder="Data Cadastro" id="icon_telephone" type="date" class="validate" v-model = "employee.creationdate">
          <label for="icon_telephone"></label>
        </div>
      </div>
    </form>
  </div>

         <center><button class="btn waves-effect waves-light blue">Salvar<i class="material-icons left">save</i></button></center>

      </form>
<br>
      <table>

        <thead>

          <tr>
            <th>Nome</th>
            <th>Cargo</th>
            <th>CPF</th>
            <th>Valor</th>
            <th>UF</th>
            <th>Status</th>
            <th>Data</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for = "employee of employees" :key = "employee.id">

            <td>{{ employee.nome }}</td>
            <td>{{ employee.cargo }}</td>
            <td>{{ employee.cpf }}</td>
            <td>{{ employee.salario }}</td>
            <td>{{ employee.ds_uf }}</td>
            <td>{{ employee.status }}</td>
            <td>{{ employee.creationdate }}</td>

            <td>
              <button @click= "editar(employee)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click= "remover(employee)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import Employee from './services/employees'

export default {

//para retornar os atributos do componente
 data(){
   return {
     employee: {
       id: '',
       nome: '',
       cargo: '',
       cpf: '',
       salario: '',            
       ds_uf: '',            
       status: '',           
       creationdate: '',        
   },
     employees: [],
     errors: []
   }
 },

//para invocar após a instancia ter sido criada
  mounted(){      
    this.listar()
  },

  methods: {

   listar(){
      Employee.listar().then(resposta => {
       this.employees = resposta.data
    })

  },

   salvar(){

     if(!this.employee.id){

    Employee.salvar(this.employee).then(resposta => {
        this.employee = {}
        alert('Salvo com sucesso!')
        this.listar()
        this.errors = []
    }).catch(e => {
        this.errors = e.response.data.errors
    })
    }else{
      Employee.atualizar(this.employee).then(resposta => {
        this.employee = {}
        alert('Atualizado com sucesso!')
        this.listar()
        this.errors = []
    }).catch(e => {
        this.errors = e.response.data.errors
    })
    }
   },

   editar(employee){
     this.employee = employee
   },

   remover(employee){
     if(confirm('Deseja excluir o funcionario?')) {
     Employee.apagar(employee).then(resposta =>  {
       this.listar();
       this.errors = []
     }).catch(e => {
       this.errors = e.response.data.errors
     })
   }
  }
  }
  
}

</script>

<style>

</style>
