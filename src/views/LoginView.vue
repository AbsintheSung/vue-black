<script setup></script>
<template>
  <div class="container vh-100 d-flex justify-content-center align-items-center">
    <form class="w-50 mx-auto d-flex flex-column" @submit.prevent>
      <div class="row mb-3">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="inputEmail3" />
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="inputPassword3" />
        </div>
      </div>
      <div class="row mb-3">
        <p class="col-12">( 此為練習用，沒有提供註冊API，要登入帳號請聯絡開發人員 )</p>
      </div>
      <div class="row mb-3">
        <div class="col-12 text-end">
          <button type="submit" class="w-25 btn btn-primary d-none d-md-inline-block">登入</button>
          <button type="submit" class="btn btn-primary w-100 d-md-none">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped></style>
