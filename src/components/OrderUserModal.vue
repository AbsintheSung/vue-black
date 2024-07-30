<script setup>
import { computed } from 'vue'
import { useModal } from '../plugins/bootstrap.modal.js'
const mymodal = useModal()
const orderUserModal = mymodal.modalOption
const props = defineProps({
  orderUserInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const orderInfo = computed(() => props.orderUserInfo)
const orderTotalQty = computed(() => {
  let qty = 0
  if (Object.keys(props.orderUserInfo).length === 0) return {}
  Object.entries(props.orderUserInfo.products).forEach((key) => {
    qty = qty + key[1].qty
  })
  return qty
})

const handleClose = () => {
  mymodal.myModalClose()
}
const handleOpen = () => {
  mymodal.myModalShow()
}
defineExpose({
  handleOpen,
  handleClose
})
</script>
<template>
  <Teleport to="body">
    <div class="modal fade" tabindex="-1" ref="orderUserModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content border-0">
          <div class="modal-header">
            <h5 class="modal-title">
              <span>訂單資訊</span>
            </h5>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">商品名稱</th>
                  <th scope="col">數量</th>
                  <th scope="col">單價</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in orderUserInfo.products" :key="key">
                  <td>{{ value.product.title }}</td>
                  <td>{{ value.qty }}</td>
                  <td>{{ value.product.price }}</td>
                </tr>
              </tbody>
              <tfoot>
                <td class="py-2">總計:</td>
                <td class="py-2">總數量 : {{ orderTotalQty }}</td>
                <td class="py-2">總價 : {{ orderUserInfo.total }}</td>
              </tfoot>
            </table>
            <div v-if="Object.keys(orderInfo).length > 0" class="container px-0">
              <h2>購買人資訊</h2>
              <div class="row">
                <div class="col-12">
                  <div class="mb-3">
                    <label for="userEmail" class="form-label">Email</label>
                    <input
                      type="email"
                      :value="orderInfo.user.email"
                      :disabled="true"
                      class="form-control"
                      id="userEmail"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <label for="userName" class="form-label">姓名</label>
                    <input
                      type="type"
                      :value="orderInfo.user.name"
                      :disabled="true"
                      class="form-control"
                      id="userName"
                      aria-describedby="nameHelp"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <label for="userPhone" class="form-label">電話</label>
                    <input
                      type="email"
                      :value="orderInfo.user.tel"
                      :disabled="true"
                      class="form-control"
                      id="userPhone"
                      aria-describedby="phoneHelp"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <label for="userAddress" class="form-label">地址</label>
                    <input
                      type="email"
                      :value="orderInfo.user.address"
                      :disabled="true"
                      class="form-control"
                      id="userAddress"
                      aria-describedby="addressHelp"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12"></div>
              <!-- <button type="button" class="btn btn-danger me-3" @click="handleClose">取消</button>
            <button type="button" class="btn btn-primary" @click="handleConfirm">確認</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped></style>
