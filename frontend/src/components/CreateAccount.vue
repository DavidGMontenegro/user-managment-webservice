<template>
    <div class="container">
        <Navbar/>
        <router-view></router-view>
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