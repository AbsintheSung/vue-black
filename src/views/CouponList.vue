<script setup>
import axios from '../utils/http'
import CouponModal from '@/components/CouponModal.vue'
import DelCouponModal from '@/components/DelCouponModal.vue'
import { useDateFormat } from '../composables/dateFormat.js'
import { computed, onMounted, ref } from 'vue'
const baseURL = import.meta.env.VITE_APP_API_URL
const apiName = import.meta.env.VITE_APP_API_NAME
const { formatTimestamp, dateChangeUnix } = useDateFormat()
const couponModalControl = ref('')
const delCouponModalControl = ref('')
const couponList = ref([])
const delOneCoupon = ref({})
const isEdit = ref(false)
const initCouPonItem = {
  code: '',
  due_date: new Date(),
  id: '',
  is_enabled: 1,
  num: '',
  percent: '',
  title: ''
}
const couPonData = ref({})
const renderCouponList = computed(() => {
  return couponList.value.map((coupon) => ({
    ...coupon,
    due_date: formatTimestamp(coupon.due_date)
  }))
})
const handleEdit = (oneData) => {
  isEdit.value = true
  couPonData.value = { ...oneData }
  // console.log(couPonData.value)
  couponModalControl.value.handleOpen()
}
const handleCreate = () => {
  isEdit.value = false
  couPonData.value = { ...initCouPonItem }
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
const fetchDataReq = (isEdit) => {
  const sendData = { ...couPonData.value, due_date: dateChangeUnix(couPonData.value.due_date) }
  if (isEdit) {
    // console.log('發送編輯請求', sendData)
    sendEditReq(sendData)
  } else {
    // console.log('發送新增請求', sendData)
    sendCreateReq(sendData)
  }
}
const sendEditReq = async (couponData) => {
  const temp = {
    data: {
      ...couponData
    }
  }
  try {
    const response = await axios.put(`${baseURL}/v2/api/${apiName}/admin/coupon/${couponData.id}`, temp)
    if (response.status === 200) {
      await getCouponList()
      couponModalControl.value.handleClose()
    }
  } catch (error) {
    console.log('編輯請求失敗', error)
  }
}
const sendCreateReq = async (couponData) => {
  const temp = {
    data: {
      ...couponData
    }
  }
  try {
    const response = await axios.post(`${baseURL}/v2/api/${apiName}/admin/coupon`, temp)
    if (response.status === 200) {
      await getCouponList()
      couponModalControl.value.handleClose()
    }
  } catch (error) {
    console.log('新建請求失敗', error)
  }
}
const handleDel = (couponData) => {
  delOneCoupon.value = couponData
  delCouponModalControl.value.handleOpen()
}
const getDelData = async (dataId) => {
  try {
    const response = await axios.delete(`${baseURL}/v2/api/${apiName}/admin/coupon/${dataId}`)
    if (response.status === 200) {
      await getCouponList()
      delCouponModalControl.value.handleClose()
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getCouponList()
})
</script>
<template>
  <DelCouponModal ref="delCouponModalControl" :delData="delOneCoupon" @delCoupon="getDelData" />
  <CouponModal ref="couponModalControl" v-model:couPonItem="couPonData" :isEdit="isEdit" @sendReq="fetchDataReq" />
  <div>我是優惠卷列表</div>
  <div class="text-end">
    <button class="btn btn-primary" type="button" @click="handleCreate">新增優惠券</button>
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
          <span class="text-success" v-if="couponItem.is_enabled">啟用</span>
          <span class="text-danger" v-else>未啟用</span>
        </td>
        <td>
          <div class="d-flex align-items-center">
            <button class="btn btn-outline-primary" @click="handleEdit(couponItem)">編輯</button>
            <button class="btn btn-outline-danger ms-2" @click="handleDel(couponItem)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped></style>
