<template>
    <div class="main-div">
        <div class="container">
            <h1>Account Verified Successfully</h1>
            <p>Your account has been verified successfully. You can now log in and start using our services!</p>
        </div>
    </div>
</template>

<script>
import UserManagment from '../services/signUp'
    export default {
        created() {
            const accessToken = this.$route.params.token;
            if (accessToken) {
                this.verifyAccount(accessToken)
            }
        },
        methods: {
             async verifyAccount(accessToken) {
                await UserManagment.activateAccount(accessToken);
            }
        }
    }
</script>


<style scoped>
.container {
    text-align: center;
    background-color: #fff;
    margin: auto;
    margin-top: 60px;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    width: 300px;
}

h1 {
    color: #333;
}

p {
    color: #666;
}
</style>