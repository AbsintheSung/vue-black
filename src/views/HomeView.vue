<script setup>
import axios from '../utils/http'
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
        <aside class="col-1 border-end pt-5">我是測攔</aside>
        <main class="col pt-5">我是內容</main>
      </div>
    </div>
  </div>
</template>
