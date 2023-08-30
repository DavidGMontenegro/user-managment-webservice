<template>
    <div class="body">
        <div class="container">
            <form class="form_main" @submit.prevent="signUp">
                <h1>CREATE AN ACCOUNT</h1>
                <div class="grid-container">
                    <div class="inputContainer">
                        <input placeholder="Name" v-model="name" class="inputField" type="text" required>
                    </div>

                    <div class="inputContainer">
                        <input placeholder="Surnames" v-model="surnames" class="inputField" type="text" required>
                    </div>

                    <div class="inputContainer">
                        <input placeholder="Username" v-model="username" class="inputField" type="text" required>
                    </div>
                    
                    <div class="inputContainer">
                        <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" class="inputIcon">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                        </svg>
                        <input placeholder="Password" v-model="password" class="inputField" type="password" required>
                    </div>

                    <div class="inputContainer">
                        <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" class="inputIcon">
                            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                        </svg>
                        <input placeholder="Email" v-model="email" class="inputField" type="email" required>
                    </div>
                    <div class="inputContainer">
                        <div class="role-checkbox">
                            <input value="private" name="switch" v-model="role" type="checkbox" class="switch">
                            <p>Teacher?</p>
                        </div>
                    </div>
                </div>    
                <button type="submit" class="btn">SIGN UP</button>
                <div class="logInContainer">
                    <p>Already have an account?</p>
                    <router-link 
                    :to="`/login`">
                        <div class="title">Log In</div>
                        <div class="bar"></div>
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import UserManagement from "../services/signUp"

export default {
  data: () => ({
      name: "",
      surnames: "",
      email: "",
      role: 0,
      username: "",
      password: ""
    
  }),
  methods: {
    async signUp(){
      try {
        await UserManagement.signUp(
          this.name,
          this.surnames,
          this.email,
          this.role + 1,
          this.username,
          this.password
        );

        this.$router.push(`/login`);
      } catch (error) {
        console.log(error);
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
      font-size: 18px;
      background-color: #007bff;
      color: white;
      border-radius: 5px;
      text-decoration: none;
      transition: background-color 0.3s;
    }

    .btn:hover {
      background-color: #0056b3;
    }

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Hasta 2 columnas, mínimo de 200px de ancho */
  gap: 20px; /* Espacio entre los elementos */
  margin-bottom: 20px;
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
  border-bottom: 2.5px solid rgb(122, 122, 122);
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

    .logInContainer {
  margin: 0;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logInContainer p {
  font-size: 1em;
  font-weight: 500;
  color: black;
}

.logInContainer a {
  font-size: .9em;
  font-weight: 500;
  background-color: #2e2e2e;
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 20px;
}

.role-checkbox{
  display: flex;
  align-content: center;
}

.role-checkbox p{
  margin: 0px;
  margin-left: 10px;
}
  </style>