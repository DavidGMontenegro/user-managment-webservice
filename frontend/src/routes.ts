import { createRouter, createWebHashHistory } from 'vue-router';
import LogIn from './components/LogIn.vue'
import Principal from './components/Principal.vue'
import CreateAccount from './components/CreateAccount.vue'
import UserView from './components/UserView.vue'

import SignUp from './views/SignUp.vue'
import AccountVerification from './views/AccountVerification.vue'
import ChangePassword from './views/ChangePassword.vue'
import SendPasswordEmail from './views/SendPasswordEmail.vue'

import Dashboard from './views/userViews/Dashboard.vue'
import ChooseSubject from './views/userViews/ChooseSubject.vue'
import Profile from './views/userViews/Profile.vue'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', component: Principal},
        {path: '/login', component: LogIn},
        {path: '/send-password-email', component: SendPasswordEmail},
        {path: '/change-password/:token', component: ChangePassword},
        {
            path: '/create-account', 
            component: CreateAccount,
            children: [
                {path: 'account-data-form', component: SignUp},
                {path: 'account-verification/:token', component: AccountVerification}
            ]
        },
        {
            path: '/:token', 
            component: UserView,
            children: [
                {path: 'dashboard', component: Dashboard},
                {path: 'choose-subjects', component: ChooseSubject},
                {path: 'profile', component: Profile}
            ]
        }
    ]
})

export default router;