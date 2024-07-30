<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menus = ref([
  {
    name: '產品管理',
    path: '/productlist',
    routerName: 'ProductList',
    active: false
  },
  {
    name: '訂單管理',
    path: '/orderlist',
    routerName: 'OrderList',
    active: false
  },
  {
    name: '優惠卷管理',
    path: '/couponlist',
    routerName: 'ConponList',
    active: false
  }
])
const activeMenus = computed(() => {
  if (route.name === 'index') {
    return menus.value
  }
  return menus.value.map((item) => ({
    ...item,
    active: item.routerName === route.name
  }))
})
</script>
<template>
  <aside class="aside border-end pt-5 px-0">
    <ul class="list-group rounded-0">
      <li
        class="list-group-item"
        v-for="listItem in activeMenus"
        :key="listItem.routerName"
        :class="{ active: listItem.active }"
        :aria-current="listItem.active ? 'true' : undefined"
      >
        <router-link class="link-light text-decoration-none" :to="listItem.path">{{ listItem.name }} </router-link>
      </li>
    </ul>
  </aside>
</template>
<style scoped>
/* 此處不想要再另外 引入bootstrap 的變數 去做新增，所以直接將樣式寫在此處  */
.aside {
  width: 250px;
}
</style>
