<template>
  <div class="header">
    <div class="logo">
      <router-link 
        :to="`dashboard`"
        class="logo-link">
            David García
        </router-link>
        
    </div>
    <div class="menu">
      <div class="user-details">
        <h1>{{ user.name }} {{ user.surnames }}</h1>
        <p>{{ user.username }}</p>
      </div>

      <div class="dropdown">
        <button class="dropdown-button">
          <div class="user-avatar">
            <img :src="profilePicture">
          </div>
        </button>
        <div class="dropdown-content">
          <router-link 
            :to="`profile`">
                Profile
          </router-link>
          <router-link 
            :to="`/`"
            :userData="user">
                Logout
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <router-view v-if="userDataLoaded" 
                :userData="user"
                :userSubjects="subjects"></router-view>
</template>

<script>
  import UserManagment from '../services/signUp'
  import SubjectManagement from '../services/subjects'
  
  export default {
    data() {
      return {
        profilePicture: require("../assets/user_icon.png"),
        user: {
          id: '',
          name: '',
          surnames: '',
          username: '',
          role: 0
        },
        userDataLoaded: false,
        subjects: []
      };
    },
    mounted() {
      const accessToken = this.$route.params.token;
      if (accessToken) {
        this.loadUserData(accessToken)
      }
    },
    methods: {
      async loadUserData(accessToken) {
          try {
              const userData = await UserManagment.loadUserData(accessToken);
  
              if (userData.status != 404){
                  this.user.id = userData.data.user_data.id;
                  this.user.name = userData.data.user_data.name;
                  this.user.surnames = userData.data.user_data.surnames;
                  this.user.username = userData.data.user_data.username;
                  this.user.role = userData.data.user_data.role;
                  
                 try {
                      const userSubjects = await SubjectManagement.getUserSubjects(userData.data.user_data.id, userData.data.user_data.role);
                      this.subjects = userSubjects.data.subjects
                      if(userSubjects.status === 200){
                        this.userDataLoaded = true;
                        this.$router.push(`dashboard`);
                      }
                 } catch (error) {
                  this.userDataLoaded = true;
                  this.$router.push(`choose-subjects`);
                 }
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
@import url(https://fonts.googleapis.com/css?family=Dosis:200,300,400,500,600,700,800);

.menu {
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-right: 30px;
}

.user-avatar {
  width: 70px;
  height: 70px;
  background-color: #ccc;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
}

img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.user-details {
  margin-right: 20px;
  margin-top: 15px;
}

.user-details h1 {
  margin: 0;
  font-size: 1.7rem;
  font-weight: 600;
}

.user-details p {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 400;
  color: #777;
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.dropdown {
  position: relative;
}

.dropdown-button {
  background: none;
  border: none;
  cursor: pointer;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: none;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  font-size: 1.2rem;
  text-align: center;
  color: black;
  padding: 10px 15px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.header {
    font-family: 'Dosis';
  font-weight: 300;
  width: 100%;
  border-bottom: 1px solid white;
  color: white;
  background-color: #0F0F0F;
  text-align: right;
  position: relative;
  height: 90px;
}
  
.header .logo {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 32px;
    font-weight: 200;
    padding: 26px;
    border-right: 1px solid white;
  }

.logo-link {
  text-decoration: none;
  color: white;
}

.link {
  display: inline-block;
  padding: 15px 0;
  margin: 15px 25px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  color: white;
  font-weight: 800;
  font-size: 24px;
}

.link .bar {
    width: 100%;
    display: inline-block;
    border-bottom: 5px solid white;
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: all 300ms;
  }
  
.link:hover .bar {
    opacity: 1;
    bottom: 5px;
}

</style>
