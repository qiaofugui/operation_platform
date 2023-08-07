<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import {
  getAllPermissionAPI
} from '@/api/acl/permission'
import {
  PermissionResponseData,
  Permission
} from '@/api/acl/permission/type'

const permissionList = ref<Permission[]>([])
const loading = ref(false)

const getPermissionList = async () => {
  loading.value = true

  const res: PermissionResponseData = await getAllPermissionAPI()
  if (res.code !== 200) return ElMessage.error(res.message)
  permissionList.value = res.data
  loading.value = false
}

onMounted(() => {
  getPermissionList()
})
</script>

<template>
  <el-card>
    <el-table
      v-loading="loading"
      border
      :data="permissionList"
      row-key="id"
    >
      <el-table-column
        label="名称"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="权限值"
        prop="code"
      ></el-table-column>
      <el-table-column
        label="修改时间"
        prop="updateTime"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="265px"
      >
        <template #="{ row }">
          <el-button
            :type="row.level === 3 ? 'info' : 'success'"
            size="small"
            icon="Plus"
            :disabled="row.level === 4 ? true : false"
            @click=""
          >{{row.level === 3 ? '添加功能' : '添加菜单'}}</el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            :disabled="row.level === 1 ? true : false"
            @click=""
          >编辑</el-button>
          <el-popconfirm
            :title="`确定要批量删除吗?`"
            icon="DeleteFilled"
            icon-color="#f56c6c"
            @confirm=""
          >
            <template #reference>
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                :disabled="row.level === 1 ? true : false"
              >删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped></style>
