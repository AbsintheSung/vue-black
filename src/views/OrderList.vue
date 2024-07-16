<script setup>
import axios from '../utils/http'
import OrderUserModal from '@/components/OrderUserModal.vue'
import DelOrderModal from '@/components/DelOrderModal.vue'
import { useDateFormat } from '../composables/dateFormat.js'
import { computed, onMounted, ref } from 'vue'
const baseURL = import.meta.env.VITE_APP_API_URL
const apiName = import.meta.env.VITE_APP_API_NAME
const { formatTimestamp } = useDateFormat()
const orderData = ref([])
const OrderUserModalControl = ref('')
const delOrderModalControl = ref('')
const delOrderId = ref('')
const orderUserInfo = ref({})
const orderListData = computed(() => {
  return orderData.value.map((item) => {
    const formatDate = formatTimestamp(item.create_at)
    return {
      ...item,
      create_at: formatDate
    }
  })
})

const getOrderList = async () => {
  const response = await axios(`${baseURL}/v2/api/${apiName}/admin/orders`)
  orderData.value = response.data.orders
  console.log(response.data.orders)
}
const handleUserInfo = (orderItem) => {
  orderUserInfo.value = orderItem
  OrderUserModalControl.value.handleOpen()
}
const handleDelOrder = (orderId) => {
  delOrderId.value = orderId
  delOrderModalControl.value.handleOpen()
  // console.log(orderId)
}
const sendDelOrderId = async (orderId) => {
  orderId === 'all' ? delAllOrder(orderId) : delOneOrder(orderId)

}
const delOneOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${baseURL}/v2/api/${apiName}/admin/order/${orderId}`)
    if (response.status === 200) {
      await getOrderList()
      delOrderModalControl.value.handleClose()
    }
  } catch (error) {
    console.log(error)
  }
}
const delAllOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${baseURL}/v2/api/${apiName}/admin/orders/${orderId}`)
    if (response.status === 200) {
      await getOrderList()
      delOrderModalControl.value.handleClose()
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getOrderList()
})
</script>
<template>
  <OrderUserModal ref="OrderUserModalControl" :orderUserInfo="orderUserInfo" />
  <DelOrderModal ref="delOrderModalControl" :delOrderId="delOrderId" @delOrder="sendDelOrderId" />
  <h2>訂單列表</h2>
  <div class="text-end">
    <button class="btn btn-danger" type="button" @click="handleDelOrder('all')">刪除全部訂單</button>
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th>訂單編號</th>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>功能</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="orderItem in orderListData" :key="orderItem.id">
        <td>
          <button type="button" class="btn btn-link" @click="handleUserInfo(orderItem)">{{ orderItem.id }}</button>
        </td>
        <td>{{ orderItem.create_at }}</td>
        <td>{{ orderItem.user.email }}</td>
        <td>我是購買款項內容</td>
        <td>{{ orderItem.total }}</td>
        <td>
          <span class="text-success" v-if="orderItem.is_paid">已付款</span>
          <span class="text-danger" v-else>未付款</span>
        </td>
        <td>
          <div class="d-flex align-items-center">
            <button class="btn btn-outline-success">付款</button>
            <button class="btn btn-outline-danger ms-2" @click="handleDelOrder(orderItem.id)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped></style>
