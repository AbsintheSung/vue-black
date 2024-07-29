<script setup>
import { useModal } from '../plugins/bootstrap.modal.js'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { userSchema } from '@/plugins/vee-vailbate.config'
const schema = userSchema
const modal = useModal()
const productModal = modal.modalOption
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false
  }
})

const productItem = defineModel('productItem', { type: Object })

const handleClose = () => {
  modal.myModalClose()
}
// const isEdit = ref(false)
const handleOpen = async () => {
  modal.myModalShow()
}
const emits = defineEmits({
  sendIsEdit: (isEdit) => {
    return typeof isEdit === 'boolean' ? true : false
  }
})
const handleSendData = async (validate, resetForm) => {
  const response = await validate()
  if (response.valid) {
    emits('sendIsEdit', props.isEdit, resetForm)
  } else {
    return
  }
  // emits('sendIsEdit', props.isEdit)
}

defineExpose({
  handleOpen,
  handleClose
})
</script>
<template>
  <Teleport to="body">
    <div class="modal fade" tabindex="-1" ref="productModal">
      <div class="modal-dialog modal-xl">
        <Form class="modal-content border-0" :validation-schema="schema" v-slot="{ validate, resetForm, errors }">
          <div class="modal-header">
            <h5 class="modal-title">
              <span v-if="isEdit">編輯產品</span>
              <span v-else>新增產品</span>
            </h5>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-3 overflow-auto" style="height: 490px">
                  <div class="mb-2">
                    <label for="image" class="form-label">輸入圖片網址(主要)</label>
                    <Field
                      type="text"
                      class="form-control"
                      id="image"
                      name="imageUrl"
                      placeholder="請輸入圖片連結"
                      v-model="productItem.imageUrl"
                      :class="{ 'is-invalid': errors.imageUrl, 'is-valid': !errors.imageUrl && productItem.imageUrl }"
                    />
                    <ErrorMessage name="imageUrl" class="invalid-feedback" />
                    <img class="img-fluid" :src="productItem.imageUrl" alt="" />
                  </div>
                  <div class="mb-2" v-for="(imgItem, index) in productItem.imagesUrl" :key="index">
                    <label for="image" class="form-label">輸入圖片網址(圖-{{ index + 1 }})</label>
                    <input
                      type="text"
                      class="form-control"
                      id="image"
                      name="file-to-upload"
                      placeholder="請輸入圖片連結"
                      v-model="productItem.imagesUrl[index]"
                    />
                    <img
                      v-if="productItem.imagesUrl[index] !== undefined"
                      class="img-fluid"
                      :src="productItem.imagesUrl[index]"
                      :alt="`圖片-${index + 1}`"
                    />
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="row gx-2 mb-3">
                  <div class="mb-3 col-md-7">
                    <label for="title" class="form-label">產品標題</label>
                    <Field
                      type="text"
                      class="form-control"
                      id="title"
                      name="title"
                      placeholder="請輸入產品標題"
                      v-model="productItem.title"
                      :class="{ 'is-invalid': errors.title, 'is-valid': !errors.title && productItem.title }"
                    />
                    <ErrorMessage name="title" class="invalid-feedback" />
                  </div>
                  <div class="mb-3 col-md-5">
                    <label for="category" class="form-label">分類</label>
                    <Field
                      type="text"
                      class="form-control"
                      id="category"
                      name="category"
                      placeholder="請輸入分類"
                      v-model="productItem.category"
                      :class="{ 'is-invalid': errors.category, 'is-valid': !errors.category && productItem.category }"
                    />
                    <ErrorMessage name="category" class="invalid-feedback" />
                  </div>
                </div>
                <div class="row gx-2 mb-3">
                  <div class="mb-3 col-md-4">
                    <label for="price" class="form-label">單位</label>
                    <Field
                      type="text"
                      class="form-control"
                      id="unit"
                      name="unit"
                      placeholder="請輸入單位"
                      v-model="productItem.unit"
                      :class="{ 'is-invalid': errors.unit, 'is-valid': !errors.unit && productItem.unit }"
                    />
                    <ErrorMessage name="unit" class="invalid-feedback" />
                  </div>
                  <div class="mb-3 col-md-4">
                    <label for="origin_price" class="form-label">原價</label>
                    <Field
                      type="number"
                      class="form-control"
                      id="origin_price"
                      name="origin_price"
                      placeholder="請輸入原價"
                      v-model="productItem.origin_price"
                      :class="{ 'is-invalid': errors.origin_price, 'is-valid': !errors.origin_price && productItem.origin_price }"
                    />
                    <ErrorMessage name="origin_price" class="invalid-feedback" />
                  </div>
                  <div class="mb-3 col-md-4">
                    <label for="price" class="form-label">售價</label>
                    <Field
                      type="number"
                      class="form-control"
                      id="price"
                      name="price"
                      placeholder="請輸入售價"
                      v-model="productItem.price"
                      :class="{ 'is-invalid': errors.price, 'is-valid': !errors.price && productItem.price }"
                    />
                    <ErrorMessage name="price" class="invalid-feedback" />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <Field
                    as="textarea"
                    type="text"
                    class="form-control"
                    id="description"
                    name="description"
                    placeholder="請輸入產品描述"
                    v-model="productItem.description"
                    :class="{ 'is-invalid': errors.description, 'is-valid': !errors.description && productItem.description }"
                  />
                  <ErrorMessage name="description" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <Field
                    as="textarea"
                    type="text"
                    class="form-control"
                    id="content"
                    name="content"
                    placeholder="請輸入產品說明內容"
                    v-model="productItem.content"
                    :class="{ 'is-invalid': errors.content, 'is-valid': !errors.content && productItem.content }"
                  />
                  <ErrorMessage name="content" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      :true-value="1"
                      :false-value="0"
                      v-model="productItem.is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled"> 是否啟用 </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger me-3" data-bs-dismiss="modal" @click="handleClose">取消</button>
            <button type="button" class="btn btn-primary" @click="handleSendData(validate, resetForm)">確認</button>
          </div>
        </Form>
      </div>
    </div>
  </Teleport>
</template>
<style scoped></style>
