<script setup>
import { computed } from 'vue'
import { useModal } from '../plugins/bootstrap.modal.js'
const mymodal = useModal()
const modal = mymodal.modalOption
const props = defineProps({
  delData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const delDataItem = computed(() => props.delData)
const handleClose = () => {
  mymodal.myModalClose()
}
const handleOpen = () => {
  mymodal.myModalShow()
}
const emits = defineEmits({
  delProduct: () => {
    return true
  }
})
const handleSendData = (productId) => {
  emits('delProduct', productId)
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
            <p>是否刪除該產品 ?</p>
            <p>產品名稱 : {{ delDataItem.title }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="handleClose">取消</button>
            <button type="button" class="btn btn-danger" @click="handleSendData(delDataItem.id)">確定</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped></style>
