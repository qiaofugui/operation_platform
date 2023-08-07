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
  console.log(res.data)
}

onMounted(() => {
  getPermissionList()
})

// 控制添加和修改菜单的dialog显示与隐藏
let dialogVisible = ref(false)

// 添加菜单按钮的回调
const addPermission = () => {
  // 显示对话框
  dialogVisible.value = true
}

// 编辑|更新菜单按钮回调
const updatePermission = (row: Permission) => {
  // 显示对话框
  dialogVisible.value = true
}
</script>

<template>
  <el-card>
    <el-table
      v-loading="loading"
      border
      :data="permissionList"
      row-key="id"
      default-expand-all
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
            @click="addPermission"
          >{{row.level === 3 ? '添加功能' : '添加菜单'}}</el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            :disabled="row.level === 1 ? true : false"
            @click="updatePermission(row)"
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

    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="25%"
    >
      <el-form label-width="60px">
        <el-form-item label="名称">
          <el-input
            prefix-icon="EditPen"
            placeholder="请输入权限名"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input
            prefix-icon="EditPen"
            placeholder="请输入权限值"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            icon="CloseBold"
            @click="dialogVisible = false"
          >取消</el-button>
          <el-button
            type="primary"
            icon="Select"
            @click="dialogVisible = false"
          >确认</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<style lang="scss" scoped></style>
