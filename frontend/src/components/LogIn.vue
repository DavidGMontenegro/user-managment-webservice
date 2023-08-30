<template>
<Navbar/>
    <div class="body">
      
        <div class="container">
            <form class="form_main" @submit.prevent="logIn">
                <h1>LOGIN</h1>
                <div class="inputContainer">
                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="inputIcon">
                    <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                    </svg>
                <input placeholder="Username" v-model="username" class="inputField" type="text">
                </div>
                
                <div class="inputContainer">
                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="inputIcon">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                    </svg>
                    <input placeholder="Password" v-model="password" class="inputField" type="password">
                </div>
                        
                    
                <button type="submit" class="btn">LOGIN</button>
                <div class="signupContainer">
                  <p>Forgot your password?
                     <router-link 
                    :to="`/send-password-email`"
                    class="forgot-password">
                    Click here
                    </router-link>
                  </p>
                    <p class="new-account">Don't have any account?</p>
                    <router-link 
                    :to="`/create-account/account-data-form`"
                    class="btn">
                        <div class="title">Sign Up</div>
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import UserManagement from "../services/signUp"
import Navbar from './Navbar.vue'

export default {
  components: {
        Navbar
    },
  data: () => ({
      username: "",
      password: ""
    
  }),
  methods: {
    async logIn() {
    try {
        const response = await UserManagement.logIn(
            this.username,
            this.password
        );
        const access_token = response.data.access_token;

        if(response.status == 200)
          this.$router.push(`/${access_token}/`);
    } catch (error) {
        console.log(error);
        window.location.reload();
        alert('Wrong username or password. Try again');
    }
}

  }
}
</script>

<style scoped>
    .body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding-top: 90px;
      padding: 0;
      background-color: #f7f7f7;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 84vh;
      text-align: center;
    }

    .container {
      max-width: 600px;
      min-width: 300px;
      padding: 40px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 20px;
    }

    p {
      font-size: 1.2rem;
      color: #777;
      margin-bottom: 30px;
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
    }

    .btn:hover {
      background-color: #0056b3;
    }

.inputContainer {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inputIcon {
  position: absolute;
  left: 10px;
}

.inputField {
  width: 100%;
  height: 40px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid rgb(173, 173, 173);
  border-radius: 30px;
  margin: 10px 0;
  color: black;
  font-size: 1em;
  font-weight: 500;
  box-sizing: border-box;
  padding-left: 30px;
}

.inputField:focus {
  outline: none;
  border-bottom: 2px solid rgb(199, 114, 255);
}

.inputField::placeholder {
  color: rgb(80, 80, 80);
  font-size: 1em;
  font-weight: 500;
}

    .signupContainer {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.signupContainer p {
  font-size: 1em;
  font-weight: 500;
  color: black;
}

.signupContainer .btn {
  font-size: .9em;
  font-weight: 500;
  background-color: #2e2e2e;
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 20px;
}

.signupContainer .new-account {
  margin: 0px;
}


.forgot-password {
  text-decoration: none;
  color: #000000;
}

.forgot-password:hover{
  text-decoration: underline;
}
  </style>