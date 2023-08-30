import http from "../http-common";

const API_URL_PATH = "/subjects";

class SubjectManagement {
    getUserSubjects(user_id: string, role: number) {
        const user_data = {user_id, role}
        try {
            return http.put(API_URL_PATH + "/get-user-subjects", user_data);
        } catch (error){
            console.log(error)
        }
    }

    getAllSubjects(){
        try {
            return http.get(API_URL_PATH + "/get-all-subjects");
        }catch (error) {
            console.log(error)
        }
    }

    saveStudentSubject(student_id: string, subject_id: string, role: number) {
        const subject_data = {student_id, subject_id, role}
        try {
            return http.post(API_URL_PATH + "/save-student-subject", subject_data);
        }catch (error) {
            console.log(error)
        }
    }

    getTeachersName(teacher_id: string) {
        const teacher_data = {teacher_id};
        try {
            return http.put(API_URL_PATH + "/get-teachers-name", teacher_data);
        }catch (error) {
            console.log(error)
        }
    }

    getSubjectName(subject_id: string) {
        try {
            return http.put(API_URL_PATH + "/get-subject-name", {subject_id});
        }catch (error) {
            console.log(error)
        }
    }
}

export default new SubjectManagement();