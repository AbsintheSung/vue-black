<script setup>
import axios from '../utils/http'
import AsideBar from '../layouts/AsideBar.vue'
import LogoutModal from '@/components/LogoutModal.vue'
import ToastView from '@/components/ToastView.vue'
import { hideLoading, showLoading } from '@/plugins/loading-overlay'
import { ref, onMounted } from 'vue'
const baseURL = import.meta.env.VITE_APP_API_URL
import { useRouter } from 'vue-router'
const logoutModalControl = ref('')
const homeToastControl = ref('')
const responseMessage = ref('')
const isLogout = ref(true)
const router = useRouter()
const checkAdmin = async () => {
  await axios.post(`${baseURL}/v2/api/user/check`)
}
const handleLogout = () => {
  isLogout.value = true
  logoutModalControl.value.handleOpen()
}
const fetchLogout = async (logiut) => {
  if (logiut) {
    try {
      showLoading()
      const response = await axios.post(`${baseURL}/v2/logout`)
      if (response.data.success) {
        logoutModalControl.value.handleClose()
        hideLoading()
        router.push('/login')
      }
    } catch (error) {
      responseMessage.value = error.response.data.message
      logoutModalControl.value.handleClose()
      homeToastControl.value.handleOpen()
      hideLoading()
    }
  }
}
onMounted(() => {
  checkAdmin()
})
</script>

<template>
  <ToastView ref="homeToastControl" :sendmessage="responseMessage" />
  <LogoutModal ref="logoutModalControl" :isLogout="isLogout" @sendLogout="fetchLogout" />
  <div class="vh-100 d-flex flex-column">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="btn btn-outline-success" @click="handleLogout">登出</button>
      </div>
    </nav>
    <div class="container-fluid flex-grow-1 ps-0">
      <div class="h-100 d-flex">
        <AsideBar />

        <main class="w-100 pt-5">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>
