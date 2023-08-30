<template>
    <div>
        <h1>Your subjects are: </h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Profesores</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="subject in subjects" :key="subject.id">
                    <td>{{ subject.id }}</td>
                    <td>{{ subject.subject_name }}</td>
                    <td>{{ subject.teachers_name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
//import UserManagment from '../services/signUp'

import SubjectManagement from '../../services/subjects'

export default {
  props: ['userSubjects'],
  data() {
    return {
      subjects: []
    };
  },
  created() {
    const accessToken = this.$route.params.token;
    if (accessToken) {
      this.loadSubjectData()
    }
  },
  methods: {
    async loadSubjectData(){
        try {
            for (const subject of this.userSubjects){
                if (subject.id_teacher) {
                    const teachers_name = await SubjectManagement.getTeachersName(subject.id_teacher);
                    const subject_name = await SubjectManagement.getSubjectName(subject.id_subject);
                    this.subjects.push({id: subject.id_subject,
                                subject_name: subject_name.data.subjectName.name,
                                teachers_name: teachers_name.data.teacherName.name + ' ' + teachers_name.data.teacherName.surnames})
                } else {
                    const subject_name = await SubjectManagement.getSubjectName(subject.id_subject);
                    this.subjects.push({id: subject.id_subject,
                                subject_name: subject_name.data.subjectName.name,
                                teachers_name: 'Unknown'});
                }
            }
        }catch (error) {
            console.log(error);
        }
    }
  }
}
</script>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

h1 {
    text-align: center;
    margin-top: 20pxpx;
}

table {
    margin: auto;
    border-collapse: collapse;
    border: 2px solid #2e2e2e;
  
}

th {
    font-size: 20px;
    padding: 10px 30px;
}

td {
    padding: 10px 30px;
    font-size: 18px;
    border: 2px solid #2e2e2e;
    text-align: center;
    font-weight: 500;
}
</style>