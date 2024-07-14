<script setup>
import axios from '../utils/http'
import { computed, onMounted, ref } from 'vue'
const baseURL = import.meta.env.VITE_APP_API_URL
const apiName = import.meta.env.VITE_APP_API_NAME
const productList = ref([])
const renderProductList = computed(() => productList.value)
const getProductList = async () => {
  try {
    const response = await axios(`${baseURL}/v2/api/${apiName}/admin/products`)
    productList.value = [...response.data.products]
    console.log(productList.value)
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getProductList()
})
</script>
<template>
  <div class="text-end">
    <button class="btn btn-primary" type="button">新增產品</button>
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
            <button class="btn btn-outline-primary">編輯</button>
            <button class="btn btn-outline-danger ms-2">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped></style>
