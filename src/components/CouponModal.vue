<script setup>
import { DatePicker } from '../plugins/vcalendar.config'
import { useModal } from '../plugins/bootstrap.modal.js'
import { ref, watch, nextTick } from 'vue'
const isEdit = ref(false)
const date = ref(new Date())
const props = defineProps({
  sendCouponData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const couPonItem = ref({})
const initCouPonItem = {
  code: '',
  due_date: '',
  id: '',
  is_enabled: 1,
  num: '',
  percent: '',
  title: ''
}
function convertDateFormat(dateString) {
  // 解析日期字符串
  const [year, month, day] = dateString.split('/').map((num) => parseInt(num, 10))

  // 創建 Date 對象（注意：JavaScript 的月份是從 0 開始的）
  const date = new Date(year, month - 1, day)

  // 設置時間（這裡設置為 01:11:31，你可以根據需要修改）
  date.setHours(1, 11, 31)

  // 返回格式化的日期字符串
  return date.toString()
}
watch(
  () => props.sendCouponData,
  (newProps) => {
    // console.log(Object.getOwnPropertyNames(newProps).length)
    if (Object.getOwnPropertyNames(newProps).length === 0) {
      couPonItem.value = { ...initCouPonItem }
      couPonItem.value.due_date = date
    } else {
      // console.log(newProps)
      couPonItem.value = { ...newProps }
    }
    // console.log(productItem.value)
  }
)
const mymodal = useModal()
const couponModal = mymodal.modalOption
const handleClose = () => {
  mymodal.myModalClose()
}
const handleOpen = async () => {
  isEdit.value = false
  mymodal.myModalShow()
  await nextTick()
  if (Object.getOwnPropertyNames(props.sendCouponData).length != 0) {
    couPonItem.value = { ...props.sendCouponData }
    // console.log(convertDateFormat(couPonItem.value.due_date))
    date.value = convertDateFormat(couPonItem.value.due_date)
    isEdit.value = true
  }
}
defineExpose({
  handleOpen,
  handleClose
})
const test = () => {
  console.log(couPonItem.value)
}
</script>
<template>
  <Teleport to="body">
    <div class="modal fade" tabindex="-1" ref="couponModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content border-0">
          <div class="modal-header">
            <h5 class="modal-title">
              <span>{{ isEdit ? '編輯優惠券' : '新增優惠券' }}</span>
            </h5>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 mb-3">
                <label for="coupon-title" class="form-label">優惠券標題</label>
                <input type="type" class="form-control" id="coupon-title" placeholder="請輸入優惠券標題" v-model="couPonItem.title" />
              </div>
              <div class="col-12 mb-3">
                <label for="coupon-code" class="form-label">優惠碼</label>
                <input type="type" class="form-control" id="coupon-code" placeholder="請輸入優惠券優惠碼" v-model="couPonItem.code" />
              </div>
              <div class="col mb-3">
                <div class="row gx-2 mb-3">
                  <div class="mb-3 col-md-8">
                    <label for="time" class="form-label">到期日</label>
                    <DatePicker v-model="date" :popover="false" is-dark="true">
                      <template #default="{ togglePopover, inputValue, inputEvents }">
                        <div class="input-group">
                          <span class="input-group-text" id="basic-addon1" @click="() => togglePopover()">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-calendar"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
                              ></path>
                            </svg>
                          </span>
                          <input
                            :value="inputValue"
                            v-on="inputEvents"
                            type="text"
                            class="form-control"
                            placeholder="Input group example"
                            aria-label="Input group example"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </template>
                    </DatePicker>
                  </div>
                  <div class="mb-3 col-md-4">
                    <label for="discount" class="form-label">折扣百分比</label>
                    <input type="number" class="form-control" id="discount" placeholder="請輸入折扣比" v-model="couPonItem.percent" />
                  </div>
                </div>
                <div class="col mb-3">
                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="is_enabled"
                        :true-value="1"
                        :false-value="0"
                        v-model="couPonItem.is_enabled"
                      />
                      <label class="form-check-label" for="is_enabled"> 是否啟用 </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger me-3" @click="handleClose">取消</button>
            <button type="button" class="btn btn-primary" @click="test">確認</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style>
.vc-title,
.vc-nav-title,
.vc-nav-item,
.vc-nav-arrow,
.vc-arrow {
  background-color: #0f172a;
}
</style>
