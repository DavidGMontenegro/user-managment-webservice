<template>
  <div class="header">
    <div class="logo">
      <router-link 
        :to="`/`"
        class="logo-link">
            David García
        </router-link>
        
    </div>
    <div class="menu">
        <router-link 
        :to="`/login`"
        class="link">
            <div class="title">Log In</div>
            <div class="bar"></div>
        </router-link>
        
        <router-link 
        :to="`/create-account/account-data-form`"
        class="link">
            <div class="title">Sign Up</div>
            <div class="bar"></div>
        </router-link>
    </div>
    </div>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Dosis:200,300,400,500,600,700,800);

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
