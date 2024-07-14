<script setup></script>
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
      <tr>
        <td>A分類</td>
        <td>A名稱A名稱A名稱A名稱</td>
        <td>A價格</td>
        <td>B價格</td>
        <td>
          <span class="text-success">啟用</span>
          <span class="text-danger">未啟用</span>
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
