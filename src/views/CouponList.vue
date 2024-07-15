<script setup></script>
<template>
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
      <tr>
        <td>優惠券1號</td>
        <td>折扣百分比</td>
        <td>到期日</td>
        <td>
          <span class="text-success" v-if="true">啟用</span>
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
