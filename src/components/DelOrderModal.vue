<script setup>
// import { computed } from 'vue'
import { useModal } from '../plugins/bootstrap.modal.js'
const mymodal = useModal()
const modal = mymodal.modalOption
defineProps({
  delOrderId: {
    type: String,
    default: ''
  }
})

// const delOneOrderId = computed(() => props.delOrderId)
const handleClose = () => {
  mymodal.myModalClose()
}
const handleOpen = () => {
  mymodal.myModalShow()
}
const emits = defineEmits({
  delOrder: () => {
    return true
  }
  //   delAllOrder: () => {
  //     return true
  //   }
})
const handleSendData = (orderId) => {
  //   orderId === 'all' ? emits('delAllOrder', orderId) : emits('delOrder', orderId)
  emits('delOrder', orderId)
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
            <h1 class="modal-title fs-5">刪除警告</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <template v-if="delOrderId === 'all'"> <p>是否刪除所有訂單</p> </template>
            <template v-else>
              <p>是否刪除該訂單 ?</p>
              <p>產品編號 : {{ delOrderId }}</p>
            </template>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="handleClose">取消</button>
            <button type="button" class="btn btn-danger" @click="handleSendData(delOrderId)">確定</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped></style>
