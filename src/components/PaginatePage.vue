<script setup>
import Paginate from 'vuejs-paginate-next'
defineProps({
  //總頁數( 必填 ) ，所以給予自定義預設值
  pageCount: {
    type: Number,
    default: 1
  },
  //顯示頁面範圍。官方默認值：3
  pageRange: {
    type: Number
  },
  //邊距顯示的頁數。官方預設值：1
  marginPages: {
    type: Number
  }
})
const emits = defineEmits({
  sendPageNum: (pageNum) => {
    return typeof pageNum === 'number' ? true : false
  }
})
const handlePageNum = (pageNum) => {
  emits('sendPageNum', pageNum)
}
</script>
<template>
  <Paginate
    :page-count="pageCount"
    :margin-pages="marginPages"
    :page-range="pageRange"
    :click-handler="handlePageNum"
    :container-class="'pagination'"
    :page-class="'page-item'"
    :page-link-class="'page-link'"
    :prev-class="'prev-item'"
    :prev-link-class="'page-link prev-link-item'"
    :next-class="'next-item'"
    :next-link-class="'page-link next-link-item'"
    :break-view-class="'break-view'"
    :break-view-link-class="'break-view-link'"
    :first-last-button="true"
  ></Paginate>
</template>
<style scoped></style>
