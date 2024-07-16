<script setup></script>
<template>
  <h2>訂單列表</h2>

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
      <tr>
        <td>我是編號內容</td>
        <td>我是購買時間內容</td>
        <td>我是電子信箱內容</td>
        <td>我是購買款項內容</td>
        <td>我是應付金額內容</td>
        <td>
          <span class="text-success" v-if="true">已付款</span>
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
