<script setup>
import axios from '../utils/http'
import { computed, onMounted, ref } from 'vue'
import ProductModal from '@/components/ProductModal.vue'
const baseURL = import.meta.env.VITE_APP_API_URL
const apiName = import.meta.env.VITE_APP_API_NAME
const productModalControl = ref('')
const productList = ref([])
const renderProductList = computed(() => productList.value)
const tempProduct = ref({}) //用來傳遞單一商品內容給 modal用的
const getProductList = async () => {
  try {
    const response = await axios(`${baseURL}/v2/api/${apiName}/admin/products`)
    productList.value = [...response.data.products]
    console.log(productList.value)
  } catch (error) {
    console.log(error)
  }
}
const handleEdit = (productItem) => {
  tempProduct.value = productItem
  productModalControl.value.handleOpen()
  // console.log(productItem)
}
const handleCreate = (productItem) => {
  tempProduct.value = productItem
  productModalControl.value.handleOpen()
}
const handleDel = (productItem) => {
  console.log(productItem)
}
//接收 productModal 傳遞來的事件，來執行編輯資料( 發送API )
const getEditData = async (getdata) => {
  const productData = {
    data: { ...getdata }
  }
  // console.log('我是編輯', data)
  try {
    const response = await axios.put(`${baseURL}/v2/api/${apiName}/admin/product/${getdata.id}`, productData)
    if (response.status === 200) {
      await getProductList()
      productModalControl.value.handleClose()
      // console.log(response.status)
    }
  } catch (error) {
    console.log(error)
  }
}
//接收 productModal 傳遞來的事件，來執行新建資料( 發送API )
const getCreateData = async (getdata) => {
  const productData = {
    data: { ...getdata }
  }
  const response = await axios.post(`${baseURL}/v2/api/${apiName}/admin/product`, productData)
  console.log(response)
  if (response.status === 200) {
    await getProductList()
    productModalControl.value.handleClose()
    // console.log(response.status)
  }
}
onMounted(() => {
  getProductList()
})
</script>
<template>
  <ProductModal ref="productModalControl" :sendproductItem="tempProduct" @createData="getCreateData" @editData="getEditData" />
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
</template>
<style scoped></style>
