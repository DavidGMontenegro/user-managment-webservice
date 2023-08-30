<template>
<Navbar/>
    <div class="body">
        <div class="container">
            <h1>Welcome to My Awesome Website</h1>
            <p>Your journey to awesomeness begins here. Discover amazing content and experiences.</p>
            <router-link 
                :to="`/create-account/account-data-form`"
                class="btn">
                    Create an account
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import Navbar from './Navbar.vue'

export default {
    components: {
        Navbar
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
  </style>