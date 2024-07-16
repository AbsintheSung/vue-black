<script setup>
import { useModal } from '../plugins/bootstrap.modal.js'
const mymodal = useModal()
const modal = mymodal.modalOption
defineProps({
  putOrderData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const handleClose = () => {
  mymodal.myModalClose()
}
const handleOpen = () => {
  mymodal.myModalShow()
}
const emits = defineEmits({
  putOrder: () => {
    return true
  }
})
const handleSendData = (order) => {
  emits('putOrder', order)
}
defineExpose({
  handleOpen,
  handleClose
})
</script>
<template>
  <Teleport to="body">
    <div class="modal fade" tabindex="-1" ref="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">修改通知</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>是否修改該訂單付款狀態 ?</p>
            <p>產品編號 : {{ putOrderData.id }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="handleClose">取消</button>
            <button type="button" class="btn btn-success" @click="handleSendData(putOrderData)">確定</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped></style>
