<script setup>
import axios from '../utils/http'
import { computed, onMounted, ref } from 'vue'
import ProductModal from '@/components/ProductModal.vue'
import DelProductModalVue from '@/components/DelProductModal.vue'
import PaginatePage from '@/components/PaginatePage.vue'
const baseURL = import.meta.env.VITE_APP_API_URL
const apiName = import.meta.env.VITE_APP_API_NAME
const productModalControl = ref('')
const delProductModalControl = ref('')
const productList = ref([])
const renderProductList = computed(() => productList.value)
const unitProduct = ref({}) //用來傳遞單一商品內容給 modal用的
const delTempProduct = ref({}) //用來傳遞刪除的單一商品 給 modal用
const isEdit = ref(true)
const paginateInfo = ref({})
const initUnitProduct = {
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
const getProductList = async (page = '1') => {
  try {
    const response = await axios(`${baseURL}/v2/api/${apiName}/admin/products`, {
      params: { page: page.toString() }
    })
    paginateInfo.value = response.data.pagination
    console.log(paginateInfo.value)
    productList.value = [...response.data.products]
    // console.log(productList.value)
  } catch (error) {
    console.log(error)
  }
}
const handleEdit = (productItem) => {
  unitProduct.value = { ...productItem }
  isEdit.value = true
  while (unitProduct.value.imagesUrl.length < 5) {
    unitProduct.value.imagesUrl.push(undefined)
  }
  productModalControl.value.handleOpen()
  // console.log(productItem)
}
const handleCreate = () => {
  const tempImgs = initUnitProduct.imagesUrl
  isEdit.value = false
  unitProduct.value = { ...initUnitProduct, imagesUrl: [...tempImgs] }
  productModalControl.value.handleOpen()
}
const handleDel = (productItem) => {
  delTempProduct.value = productItem
  delProductModalControl.value.handleOpen()
  // console.log(productItem)
}
//接收 productModal 傳遞來的事件，來執行編輯資料( 發送API )
const fetchEditData = async () => {
  const productData = {
    data: { ...unitProduct.value }
  }
  try {
    const response = await axios.put(`${baseURL}/v2/api/${apiName}/admin/product/${unitProduct.value.id}`, productData)
    if (response.status === 200) {
      await getProductList()
      productModalControl.value.handleClose()
    }
  } catch (error) {
    console.log(error)
  }
}
//接收 productModal 傳遞來的事件，來執行新建資料( 發送API )
const fetchCreateData = async () => {
  const productData = {
    data: { ...unitProduct.value }
  }
  const response = await axios.post(`${baseURL}/v2/api/${apiName}/admin/product`, productData)
  console.log(response)
  if (response.status === 200) {
    await getProductList()
    productModalControl.value.handleClose()
  }
}
//接收 delProductModal 傳遞來的事件，來執行刪除資料( 發送API )
const fetchDalData = async (dataId) => {
  const response = await axios.delete(`${baseURL}/v2/api/${apiName}/admin/product/${dataId}`)
  if (response.status === 200) {
    await getProductList()
    delProductModalControl.value.handleClose()
    // console.log(response.status)
  }
}
const getIsEditStatus = async (isEdit) => {
  isEdit ? await fetchEditData() : await fetchCreateData()
}
const handlePages = async (pageNum) => {
  await getProductList(pageNum)
  // console.log(pageNum)
}
onMounted(() => {
  getProductList()
})
</script>
<template>
  <DelProductModalVue ref="delProductModalControl" :delData="delTempProduct" @delProduct="fetchDalData" />
  <ProductModal ref="productModalControl" v-model:productItem="unitProduct" :isEdit="isEdit" @sendIsEdit="getIsEditStatus" />
  <div class="text-end">
    <button class="btn btn-primary" type="button" @click="handleCreate({})">新增產品</button>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th>分類</th>
        <th>產品名稱</th>
        <th>原價</th>
        <th>售價</th>
        <th>是否啟用</th>
        <th>功能</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="productItem in renderProductList" :key="productItem.id">
        <td>{{ productItem.category }}</td>
        <td>{{ productItem.title }}</td>
        <td>{{ productItem.origin_price }}</td>
        <td>{{ productItem.price }}</td>
        <td>
          <span class="text-success" v-if="productItem.is_enabled">啟用</span>
          <span class="text-danger" v-else>未啟用</span>
        </td>
        <td>
          <div class="d-flex align-items-center">
            <button class="btn btn-outline-primary" @click="handleEdit(productItem)">編輯</button>
            <button class="btn btn-outline-danger ms-2" @click="handleDel(productItem)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <PaginatePage :pageCount="paginateInfo.total_pages" @sendPageNum="handlePages"></PaginatePage>
</template>
<style scoped></style>
