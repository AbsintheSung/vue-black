<script setup>
import axios from '../utils/http'
import AsideBar from '../layouts/AsideBar.vue'
import { onMounted } from 'vue'
const baseURL = import.meta.env.VITE_APP_API_URL
const checkAdmin = async () => {
  await axios.post(`${baseURL}/v2/api/user/check`)
}
onMounted(() => {
  checkAdmin()
})
</script>

<template>
  <div class="vh-100 d-flex flex-column">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="btn btn-outline-success">登出</button>
      </div>
    </nav>
    <div class="container-fluid flex-grow-1">
      <div class="row h-100">
        <AsideBar />

        <main class="col pt-5">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>
