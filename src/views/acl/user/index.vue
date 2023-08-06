<script lang="ts" setup>
import { ref } from "vue";

// 分页器默认页码
let pageNo = ref(1)
// 分页器默认每页条数
let pageSize = ref(3)
// 分页器默认总条数
let total = ref(0)

const changePageNo = (page: number) => {
  // getSpuList(page)
}
// 下拉框改变每页显示条数
const changeSize = () => {
  // getSpuList()
}

</script>

<template>
  <div>
    <el-card style="height: 75px;">
      <el-form
        :inline="true"
        class="form"
      >
        <el-form-item label="用户名">
          <el-input placeholder="输入用户名进行搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click=""
          >搜索</el-button>
          <el-button @click="">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin: 10px 0;">
      <el-button
        type="primary"
        @click=""
      >添加</el-button>
      <el-button
        type="danger"
        @click=""
      >批量删除</el-button>

      <el-table
        style="margin: 10px 0;"
        border
        :data="[{}]"
      >
        <el-table-column
          type="selection"
          align="center"
          width="50px"
        ></el-table-column>
        <el-table-column
          type="index"
          label="#"
          align="center"
          width="60px"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="ID"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
        ></el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
        ></el-table-column>
        <el-table-column
          prop=""
          label="用户角色"
        ></el-table-column>
        <el-table-column
          prop=""
          label="创建时间"
        ></el-table-column>
        <el-table-column
          prop=""
          label="更新时间"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="265px"
        >
          <template #default="{ row }">
            <el-button
              type="success"
              size="small"
              icon="User"
              @click=""
            >分配角色</el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click=""
            >编辑</el-button>
            <el-popconfirm
              title="确定要删除吗?"
              icon="DeleteFilled"
              icon-color="#f56c6c"
              @confirm=""
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  icon="Delete"
                >删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 10, 30]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @current-change="changePageNo"
        @size-change="changeSize"
      />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
