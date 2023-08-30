<template>
  <div class="principal">
    <h1>Choose your subjects</h1>
      <table>
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Select</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="subject in subjects" :key="subject.id">
                  <td>{{ subject.id }}</td>
                  <td>{{ subject.subject_name }}</td>
                  <td><input value="private" type="checkbox" v-model="subject.selected"></td>
              </tr>
          </tbody>
      </table>
    <div class="btn-container">
        <button class="btn" @click="saveSubjects">Submit</button>
    </div>
  </div>
</template>

<script>
//import UserManagment from '../services/signUp'

import SubjectManagement from '../../services/subjects'

export default {
  props: ['userData'],
  data() {
    return {
      subjects: []
    };
  },
  created() {
    const accessToken = this.$route.params.token;
    if (accessToken) {
      this.loadSubjets()
    }
  },
  methods: {
    async loadSubjets(){
        try {
            const subject_data = await SubjectManagement.getAllSubjects();
            this.subjects = subject_data.data.map(subject => ({
            ...subject,
            selected: false  // Agrega la propiedad "private" con valor inicial
          }));
        }catch (error) {
            console.log(error);
        }
    },
    async saveSubjects() {
      for(const subject of this.subjects){
          if (subject.selected){
            try {
              
              const res = await SubjectManagement.saveStudentSubject(this.userData.id, subject.id, this.userData.role)
              
              if (res.status === 204){
                console.log('GUARDADA: ', subject.subject_name, this.userData.id)
              } else{
                console.log('Error while saving ', subject.subject_name);
              }
            } catch (error) {
              console.log(error);
            }
          }
      }
      this.$router.push(`dashboard`)
    }
  }
}
</script>

<style scoped>
.principal {
    display: flex;
    flex-direction: column;
}

h1 {
  margin-top: 0px;
  text-align: center;
}

table {
    margin: auto;
  border-collapse: collapse;
  border: 2px solid #2e2e2e;
  
}

th {
    font-size: 20px;
}

td {
  padding: 10px 30px;
  font-size: 18px;
  border: 2px solid #2e2e2e;
  text-align: center;
  font-weight: 500;
}

.btn-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      font-size: 18px;
      color: white;
      border-radius: 5px;
      text-decoration: none;
      transition: background-color 0.3s;
      height: min-content;
      width: min-content;
    }

    .btn:hover {
      background-color: #0056b3;
    }
</style>