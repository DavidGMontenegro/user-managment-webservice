<template>
<body>
  <div class="container">
    <div class="profile-picture">
      <label for="profile-picture-input">
        <img id="profile-picture-preview" :src="profilePicture">
        <div class="upload-overlay">
          <span>Change photo</span>
        </div>
      </label>
      <input type="file" id="profile-picture-input" style="display: none;" @change="handleProfilePictureChange">
    </div>
    <div class="profile-form">
      <h1>Editar Perfil</h1>
      <button class="change-password-button">
          <router-link 
                    :to="`/send-password-email`">
                    Change password
                    </router-link>
        </button>
      <form :v-if="isDataCharged" @submit.prevent="saveChanges">
        <label for="first-name">Name</label>
        <input type="text" id="first-name" :placeholder="this.userData.name" v-model="name">

        <label for="last-name">Surnames</label>
        <input type="text" id="last-name" :placeholder="this.userData.surnames" v-model="surnames">

        <label for="username">Username</label>
        <input type="text" id="username" :placeholder="this.userData.username" v-model="username">

        <button class="btn" type="submit">Save changes</button>
      </form>
    </div>
  </div>
</body>
</template>

<script>
import UserManagement from "@/services/signUp";


export default {
  props: ['userData'],
  data() {
    return {
      profilePicture: require("@/assets/user_icon.png"),
      selectedFile: '',
      name: '',
      surnames: '',
      username: '',
      isDataCharged: false,
    };
  },
  created() {
    console.log(this.userData);
    this.isDataCharged = true;

    this.name = this.userData.name;
    this.surnames = this.userData.surnames;
    this.username = this.userData.username
  },
  methods: {
    handleProfilePictureChange(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profilePicture = e.target.result;
          console.log(this.profilePicture)
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }, 
    async saveChanges() {
        try {
            console.log ('datos: ')
            console.log(this.name);
            console.log(this.surnames);
            console.log(this.username);
            const response = await UserManagement.changeUserData(this.name, this.surnames, this.username, this.userData.id)
            console.log(response)
              if (response.status === 204) {
                console.log(this.selectedFile)
                if (this.selectedFile) {
                  const formData = new FormData();
                  formData.append('selectedFile', formData)

                  try {
                    const response = await UserManagement.uploadProfilePicture(this.selectedFile)

                    if (response.status === 204) {
                      console.log('Imagen subida exitosamente');
                    } else {
                      console.error('Error al subir la imagen');
                    }
                  } catch (error) {
                    console.error('Error al subir la imagen:', error);
                  }
                }
                //this.$router.push(`dashboard`);
              }
        } catch (error){
            console.log(error);
        }
    }
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding-top: 80px;
  background-color: #f5f5f5;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-picture {
  width: 40%;
  text-align: center;
  position: relative;
  padding: 10px;
}

.profile-picture img {
  max-width: 50%;
  height: auto;
  cursor: pointer;
}

.upload-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 75%;
  margin: 0% 12.5%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.3s;
}

.upload-overlay:hover {
  opacity: 1;
}

.profile-form {
  width: 55%;
}

h1 {
  margin-top: 0;
  margin: 0px;
  width: max-content;
}

.change-password-button {
  font-size: 0.9rem;
  display: block;
  width: 85%;
  padding: 10px;
  margin-top: 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: max-content;
}

.change-password-button a {
  color: white;
  text-decoration: none;
}

.change-password-button:hover {
  background-color: #2980b9;
}

.profile-form label {
  display: block;
  margin-top: 10px;
  font-size: 1.1rem;
  font-weight: bold;
}

.profile-form input {
    font-size: 0.9rem;
  width: 80%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.profile-form .btn {
    font-size: 1.1rem;
  display: block;
  width: 85%;
  padding: 10px;
  margin-top: 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.profile-form .btn:hover {
  background-color: #2980b9;
}

</style>