<template>
<body>
  <div class="container">
    <div class="profile-form">
      <h1>Change password</h1>
      <form @submit.prevent="changePassword">
        <label>Password</label>
        <input type="password" v-model="password" placeholder="Password" required>
        <label>Repeat password</label>
        <input type="password" v-model="repeatPassword" placeholder="Repeat password" @input="checkPasswords" required>
        <p v-if="!correctPasswords">Passwords do not match</p>
        <button type="submit" v-if="correctPasswords">Save password</button>
      </form>
    </div>
  </div>
</body>
</template>

<script>
import UserManagement from "@/services/signUp.ts";

export default {
  data() {
    return {
      password: '',
      repeatPassword: '',
      correctPasswords: true,
      accessToken: ''
    };
  },
    created() {
      const accessToken = this.$route.params.token;
      if (accessToken) {
        this.loadUserData(accessToken)
      }
    },
  methods: {
    async changePassword() {
      try {
        const result = await UserManagement.changePassword(this.password, this.accessToken);
        if (result.status != 404) {
          console.log('Password Changed');
          this.$router.push(`/login`)
        } else {
          console.log('Password not changed');
        }
      } catch (error) {
        console.log(error);
      }
    },
    checkPasswords() {
      console.log('ENTRO A COMPROBAR')
      if(this.password != this.repeatPassword)
        this.correctPasswords = false
      else  
        this.correctPasswords = true
    },
    async loadUserData(accessToken) {
          try {
              const userData = await UserManagement.loadUserData(accessToken);
              if (userData.status != 404){
                this.accessToken = userData.data.user_data.accessToken
              } else {
                  console.log('User not found');
                  this.$router.push(`/`);
              }
          } catch (error){
              console.log('Error: ', error);
              this.$router.push(`/`);
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

p {
  color: red;
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

</style>