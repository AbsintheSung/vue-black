<script setup>
import axios from '../utils/http'
import CouponModal from '@/components/CouponModal.vue'
import { computed, onMounted, ref } from 'vue'
const baseURL = import.meta.env.VITE_APP_API_URL
const apiName = import.meta.env.VITE_APP_API_NAME
const couponModalControl = ref('')
const couponList = ref([])
const renderCouponList = computed(() => {
  return couponList.value.map((coupon) => ({
    ...coupon,
    due_date: formatTimestamp(coupon.due_date)
  }))
})
const handleEdit = () => {
  couponModalControl.value.handleOpen()
}
const getCouponList = async () => {
  try {
    const response = await axios(`${baseURL}/v2/api/${apiName}/admin/coupons`)
    couponList.value = [...response.data.coupons]
  } catch (error) {
    console.log(error)
  }
}
//將  Unix 时间戳 轉換成 年/月/日格式
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
}
onMounted(() => {
  getCouponList()
})
</script>
<template>
  <CouponModal ref="couponModalControl" />
  <div>我是優惠卷列表</div>
  <div class="text-end">
    <button class="btn btn-primary" type="button">新增優惠券</button>
  </div>

  <table class="table align-middle">
    <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>功能</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="couponItem in renderCouponList" :key="couponItem.id">
        <td>{{ couponItem.title }}</td>
        <td>{{ couponItem.percent }}%</td>
        <td>{{ couponItem.due_date }}</td>
        <td>
          <span class="text-success" v-if="true">啟用</span>
          <span class="text-danger" v-else>未啟用</span>
        </td>
        <td>
          <div class="d-flex align-items-center">
            <button class="btn btn-outline-primary" @click="handleEdit">編輯</button>
            <button class="btn btn-outline-danger ms-2">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped></style>
