<script setup>
import axios from 'axios'
import { ref } from 'vue'
import ToastView from '@/components/ToastView.vue'
import { useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
const router = useRouter()
const baseURL = import.meta.env.VITE_APP_API_URL
const userInputInit = {
  username: '',
  password: ''
}
const loginShowToast = ref(null)
const loginToastMes = ref('')
const userInput = ref({ ...userInputInit })
const handleLogin = async () => {
  try {
    const response = await axios.post(`${baseURL}/v2/admin/signin`, userInput.value)
    if (response.status === 200) {
      const { token, expired, message } = response.data
      document.cookie = `tokenCode=${token};expired=${new Date(expired)}`
      loginToastMes.value = '🟢' + message
      loginShowToast.value.handleOpen()
      router.push('/')
      // console.log(document.cookie.replace(/(?:(?:^|.*;\s*)tokenCode\s*=\s*([^;]*).*$)|^.*$/, '$1'))
      // console.log('跳轉')
    }
  } catch (error) {
    if (error.response.status === 400) {
      const { message } = error.response.data
      loginToastMes.value = '🔴' + message
      loginShowToast.value.handleOpen()
    }
  } finally {
    userInput.value = { ...userInputInit }
  }
}
</script>
<template>
  <ToastView ref="loginShowToast" :sendmessage="loginToastMes" />
  <div class="container vh-100 d-flex justify-content-center align-items-center">
    <form class="w-50 mx-auto d-flex flex-column" @submit.prevent>
      <div class="row mb-3">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="inputEmail3" v-model="userInput.username" />
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="inputPassword3" v-model="userInput.password" />
        </div>
      </div>
      <div class="row mb-3">
        <p class="col-12">( 此為練習用，沒有提供註冊API，要登入帳號請聯絡開發人員 )</p>
      </div>
      <div class="row mb-3">
        <div class="col-12 text-end">
          <button type="submit" class="w-25 btn btn-primary d-none d-md-inline-block" @click="handleLogin">登入</button>
          <button type="submit" class="btn btn-primary w-100 d-md-none" @click="handleLogin">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped></style>
