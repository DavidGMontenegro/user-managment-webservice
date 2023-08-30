<template>
<body>
  <div class="container">
    <div class="profile-form">
      <h1>Change password</h1>
      <form v-if="!email_sent" @submit.prevent="sendEmail">
        <label for="email">Email</label>
        <input type="email" v-model="email" placeholder="Email" required>
        <button type="submit">Save password</button>
      </form>
      <p v-else>Email sent. Check yout inbox!</p>
    </div>
  </div>
</body>
</template>

<script>
import UserManagement from "@/services/signUp.ts";

export default {
    data() {
      return {
        email: '',
        email_sent: false
      };
    },
    methods: {
        async sendEmail() {
            try {
                const result = await UserManagement.sendPasswordEmail(this.email)
                if(result.status != 404){
                  console.log('Email sent to: ', this.email);
                  this.email_sent = true;
                }else{
                  console.log('user not found')
                }
            } catch (error) {
                console.log(error)
            }
        }
        
    }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding-top: 80px;
  background-color: #f5f5f5;
}

.container {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-form {
  width: 100%;
}

h1 {
  margin-top: 0;
}

.profile-form label {
  display: block;
  margin-top: 30px;
  font-size: 1.1rem;
  font-weight: bold;
}

.profile-form input {
    font-size: 0.9rem;
  width: 86%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.profile-form button {
    font-size: 1.1rem;
  display: block;
  width: 90%;
  padding: 10px;
  margin-top: 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.profile-form button:hover {
  background-color: #2980b9;
}

</style>