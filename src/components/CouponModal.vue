<script setup>
import { DatePicker } from '../plugins/vcalendar.config'
import { useModal } from '../plugins/bootstrap.modal.js'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { couponSchema } from '@/plugins/vee-vailbate.config'
const schema = couponSchema
const couPonItem = defineModel('couPonItem', { type: Object })
const mymodal = useModal()
const couponModal = mymodal.modalOption
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits({
  sendReq: () => {
    return true
  }
})
const handleConfirm = async (validate, resetForm) => {
  const response = await validate()
  if (response.valid) {
    emits('sendReq', props.isEdit, resetForm)
  } else {
    return
  }
  // emits('sendReq', props.isEdit)
}
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
    <div class="modal fade" tabindex="-1" ref="couponModal">
      <div class="modal-dialog modal-lg">
        <Form class="modal-content border-0" :validation-schema="schema" v-slot="{ validate, resetForm, errors }">
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
                <Field
                  type="type"
                  class="form-control"
                  id="coupon-title"
                  name="couponTitle"
                  placeholder="請輸入優惠券標題"
                  v-model="couPonItem.title"
                  :class="{ 'is-invalid': errors.couponTitle, 'is-valid': !errors.couponTitle && couPonItem.title }"
                />
                <ErrorMessage name="couponTitle" class="invalid-feedback" />
              </div>
              <div class="col-12 mb-3">
                <label for="coupon-code" class="form-label">優惠碼</label>
                <Field
                  type="type"
                  class="form-control"
                  id="coupon-code"
                  name="couponCode"
                  placeholder="請輸入優惠券優惠碼"
                  v-model="couPonItem.code"
                  :class="{ 'is-invalid': errors.couponCode, 'is-valid': !errors.couponCode && couPonItem.code }"
                />
                <ErrorMessage name="couponCode" class="invalid-feedback" />
              </div>
              <div class="col mb-3">
                <div class="row gx-2 mb-3">
                  <div class="mb-3 col-md-8">
                    <label for="time" class="form-label">到期日</label>
                    <DatePicker v-model="couPonItem.due_date" :popover="false" is-dark="true">
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
                    <Field
                      type="number"
                      class="form-control"
                      id="discount"
                      name="discount"
                      placeholder="請輸入折扣比"
                      v-model="couPonItem.percent"
                      :class="{ 'is-invalid': errors.discount, 'is-valid': !errors.discount && couPonItem.percent }"
                    />
                    <ErrorMessage name="discount" class="invalid-feedback" />
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
            <button type="button" class="btn btn-primary" @click="handleConfirm(validate, resetForm)">確認</button>
          </div>
        </Form>
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
