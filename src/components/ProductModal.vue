<script setup>
import { computed, watch, ref } from 'vue'
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
// const initProductItem = {
//   category: '',
//   content: '',
//   description: '',
//   id: '',
//   imageUrl: '',
//   imagesUrl: [],
//   is_enabled: '',
//   origin_price: '',
//   price: '',
//   num: '',
//   title: '',
//   unit: ''
// }
const productItem = ref({})
const handleClose = () => {
  modal.myModalClose()
}
const handleOpen = () => {
  modal.myModalShow()
  productItem.value = { ...props.sendproductItem }
}
defineExpose({
  handleOpen
})
watch(
  () => props.sendproductItem,
  (newProps) => {
    productItem.value = { ...newProps }
    console.log(productItem.value)
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
                  <div class="mb-2">
                    <label for="image" class="form-label">輸入圖片網址(圖1)</label>
                    <input type="text" class="form-control" id="image" name="file-to-upload" placeholder="請輸入圖片連結" />
                    <img
                      class="img-fluid"
                      src="https://github.com/AbsintheSung/7TAO_webpage/blob/main/assets/images/event/03.jpg?raw=true"
                      alt=""
                    />
                  </div>
                  <div class="mb-2">
                    <label for="image" class="form-label">輸入圖片網址(圖2)</label>
                    <input type="text" class="form-control" id="image" name="file-to-upload" placeholder="請輸入圖片連結" />
                    <img class="img-fluid" src="" alt="" />
                  </div>
                  <div class="mb-2">
                    <label for="image" class="form-label">輸入圖片網址(圖3)</label>
                    <input type="text" class="form-control" id="image" name="file-to-upload" placeholder="請輸入圖片連結" />
                    <img class="img-fluid" src="" alt="" />
                  </div>
                  <div class="mb-2">
                    <label for="image" class="form-label">輸入圖片網址(圖4)</label>
                    <input type="text" class="form-control" id="image" name="file-to-upload" placeholder="請輸入圖片連結" />
                    <img class="img-fluid" src="" alt="" />
                  </div>
                  <div class="mb-2">
                    <label for="image" class="form-label">輸入圖片網址(圖5)</label>
                    <input type="text" class="form-control" id="image" name="file-to-upload" placeholder="請輸入圖片連結" />
                    <img class="img-fluid" src="" alt="" />
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
                    <input class="form-check-input" type="checkbox" id="is_enabled" v-model="productItem.is_enabled" />
                    <label class="form-check-label" for="is_enabled"> 是否啟用 </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger me-3" data-bs-dismiss="modal" @click="handleClose">取消</button>
            <button type="button" class="btn btn-primary">確認</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped></style>
