<script setup>
import { useToast } from '../plugins/bootstrap.toast.js'
const myToast = useToast()
const toastDom = myToast.toastDom
const handleClose = () => {
  myToast.handleHide()
}
const handleOpen = () => {
  myToast.handleShow()
}
defineExpose({
  handleOpen
})
</script>
<template>
  <Teleport to="body">
    <div class="toast-container position-fixed top-0 start-50 p-3">
      <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toastDom">
        <div class="toast-header">
          <img src="..." class="rounded me-2" alt="..." />
          <strong class="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
            @click="handleClose"
          ></button>
        </div>
        <div class="toast-body">Hello, world! This is a toast message.</div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped></style>
