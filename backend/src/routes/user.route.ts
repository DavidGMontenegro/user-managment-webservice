import {Router} from 'express'
import { createUser, getUsers, updateUser, deleteUser, activateAccount, login, getUserData,
     getTeachersName, changeUserData, sendPasswordEmail, changePassword, handleProfilePictureUpload } from '../controller/user.controller';
import { getUserSubjects, getAllSubjects, saveStudentSubject, getSubjectName } from '../controller/subject.controller';

const router = Router();

router.post('/users/signup', createUser)
router.put('/users/login', login)
router.put('/users/verify-account', activateAccount)
router.put('/users/get-user-data', getUserData)
router.put('/users/change-user-data', changeUserData)
router.put('/users/send-password-email', sendPasswordEmail)
router.put('/users/change-password', changePassword)
router.post('/users/upload-profile-picture', handleProfilePictureUpload);

router.delete('/users/:id', deleteUser)

router.put('/subjects/get-user-subjects', getUserSubjects)
router.get('/subjects/get-all-subjects', getAllSubjects)
router.post('/subjects/save-student-subject', saveStudentSubject)
router.put('/subjects/get-teachers-name', getTeachersName)
router.put('/subjects/get-subject-name', getSubjectName)

export default router