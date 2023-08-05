<script lang="ts" setup>
import { ref } from "vue"

let pageNo = ref(1)
let pageSize = ref(5)
let total = ref(0)

// 下拉框改变每页显示条数
const changeSize = () => {
  // getSpuList()
}
const changePageNo = (page: number) => {
  // getSpuList(page)
}
</script>

<template>
  <div>
    <el-card>
      <el-table
        border
        style="margin: 10px 0;"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="名称"
          width="150px"
          prop=""
        ></el-table-column>
        <el-table-column
          label="描述"
          width="150px"
          prop=""
        ></el-table-column>
        <el-table-column
          label="默认图片"
          width="150px"
          prop=""
        ></el-table-column>
        <el-table-column
          label="重量(克)"
          prop=""
        ></el-table-column>
        <el-table-column
          label="价格(元)"
          prop=""
        ></el-table-column>
        <el-table-column
          label="操作"
          width="260px"
          fixed="right"
        >
          <template #="{ row }">
            <el-button
              type="success"
              icon="Top"
            />
            <el-button
              type="info"
              icon="Bottom"
            />
            <el-button
              type="primary"
              icon="Edit"
            />
            <el-button
              type="InfoFilled"
              icon="InfoFilled"
            />
            <el-button
              type="danger"
              icon="Delete"
            />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 25, 50]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="changeSize"
        @current-change="changePageNo"
      />
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
