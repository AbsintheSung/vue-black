<script setup>
import { watch, ref, nextTick } from 'vue'
import { useModal } from '../plugins/bootstrap.modal.js'
const modal = useModal()
const productModal = modal.modalOption
const props = defineProps({
  sendproductItem: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const initProductItem = {
  category: '',
  content: '',
  description: '',
  id: '',
  imageUrl: '',
  imagesUrl: Array(5), //必須指派該陣列確實位子有幾個，否則渲染會有問題
  is_enabled: 0,
  origin_price: '',
  price: '',
  num: '',
  title: '',
  unit: ''
}
const productItem = ref({})
const handleClose = () => {
  modal.myModalClose()
}
const isEdit = ref(false)
const handleOpen = async () => {
  /* 暴露出 handleOpen給上層父祖件使用，但是資料渲染上是透過解構方式，會有一些小問題，使用nextTick，並判斷是否傳遞的資料為空
    不為空表示有資料，帶dom加載完再帶入資料
  */

  modal.myModalShow()
  //顯示彈窗時候，重置isEdit數值
  isEdit.value = false
  await nextTick()
  if (Object.getOwnPropertyNames(props.sendproductItem).length != 0) {
    productItem.value = { ...props.sendproductItem, imagesUrl: [...props.sendproductItem.imagesUrl] }
    //若為編輯資料，修改isEdit狀態
    isEdit.value = true
  }
}
const emits = defineEmits({
  createData: () => {
    return true
  },
  editData: () => {
    return true
  }
})
const handleSendData = (productData) => {
  //觸發事件後，傳遞給父祖件，根據狀態傳遞不同的資料上去
  isEdit.value ? emits('editData', productData) : emits('createData', productData)
}
defineExpose({
  handleOpen,
  handleClose
})
/*
  透過監聽方式，監聽傳遞進來的值
  若為空物件，表示我們要建立新的產品資料，所以解構原先組件建立的初始狀態值
  若非空物件，表示我們要編輯傳遞過來的產品資料，所以解構傳遞過來的資料
*/
watch(
  () => props.sendproductItem,
  (newProps) => {
    // console.log(Object.getOwnPropertyNames(newProps).length)
    if (Object.getOwnPropertyNames(newProps).length === 0) {
      productItem.value = { ...initProductItem, imagesUrl: [...initProductItem.imagesUrl] }
    } else {
      // console.log(newProps)
      productItem.value = { ...newProps, imagesUrl: [...newProps.imagesUrl] }
    }
    // console.log(productItem.value)
  }
)
</script>
<template>
  <Teleport to="body">
    <div class="modal fade" tabindex="-1" ref="productModal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header">
            <h5 class="modal-title">
              <span>新增產品</span>
            </h5>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-3 overflow-auto" style="height: 490px">
                  <div class="mb-2">
                    <label for="image" class="form-label">輸入圖片網址(主要)</label>
                    <input
                      type="text"
                      class="form-control"
                      id="image"
                      name="file-to-upload"
                      placeholder="請輸入圖片連結"
                      v-model="productItem.imageUrl"
                    />
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
                    <input type="text" class="form-control" id="title" placeholder="請輸入產品標題" v-model="productItem.title" />
                  </div>
                  <div class="mb-3 col-md-5">
                    <label for="category" class="form-label">分類</label>
                    <input type="text" class="form-control" id="category" placeholder="請輸入分類" v-model="productItem.category" />
                  </div>
                </div>
                <div class="row gx-2 mb-3">
                  <div class="mb-3 col-md-4">
                    <label for="price" class="form-label">單位</label>
                    <input type="text" class="form-control" id="unit" placeholder="請輸入單位" v-model="productItem.unit" />
                  </div>
                  <div class="mb-3 col-md-4">
                    <label for="origin_price" class="form-label">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="productItem.origin_price"
                    />
                  </div>
                  <div class="mb-3 col-md-4">
                    <label for="price" class="form-label">售價</label>
                    <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model="productItem.price" />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="productItem.description"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="productItem.content"
                  ></textarea>
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
            <button type="button" class="btn btn-primary" @click="handleSendData(productItem)">確認</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped></style>
