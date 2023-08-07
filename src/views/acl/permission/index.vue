<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import {
  getAllPermissionAPI,
  addOrUpdateMenuAPI,
  deleteMenuAPI
} from '@/api/acl/permission'
import {
  PermissionResponseData,
  Permission,
  AddOrUpdateMenuParams
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

// 控制添加和修改菜单的dialog显示与隐藏
let dialogVisible = ref(false)
let formRef = ref<any>(null)
let rule = ref<any>({
  name: [
    { required: true, message: '请输入名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入值', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ]
})
// 添加或修改菜单的携带参数
let menuParams: AddOrUpdateMenuParams = ref({
  id: 0,
  code: '',
  pid: 0,
  name: '',
  level: 0
})

// 添加菜单按钮的回调
const addPermission = (row: Permission) => {
  // 打开前先清空
  Object.assign(menuParams.value, {
    id: 0,
    code: '',
    pid: 0,
    name: '',
    level: 0
  })

  // 显示对话框
  dialogVisible.value = true

  // 收集新增菜单的参数
  menuParams.value.level = row.level + 1
  menuParams.value.pid = row.pid
}

// 编辑|更新菜单按钮回调
const updatePermission = (row: Permission) => {
  // 回填数据
  Object.assign(menuParams.value, row)

  // 显示对话框
  dialogVisible.value = true
}

// 确认添加|更新菜单的回调
const save = () => {
  if (menuParams.value.id) {
    addOrUpdateMenu()
  } else {
    addOrUpdateMenu()
  }
}
const addOrUpdateMenu = async () => {
  // 发送请求前校验表单
  await formRef.value.validate()

  const res: any = await addOrUpdateMenuAPI(menuParams.value)
  if (res.code !== 200) return ElMessage.error(res.message)
  ElMessage.success(res.message)
  dialogVisible.value = false
  getPermissionList()
}

// 删除菜单按钮回调
const deleteMenu = async (row: Permission) => {
  const res: any = await deleteMenuAPI(row.id)
  if (res.code !== 200) return ElMessage.error(res.message)
  ElMessage.success(res.message)
  dialogVisible.value = false
  getPermissionList()
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
            @click="addPermission(row)"
          >{{ row.level === 3 ? '添加功能' :
              '添加菜单' }}</el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            :disabled="row.level === 1 ? true : false"
            @click="updatePermission(row)"
          >编辑</el-button>
          <el-popconfirm
            :title="`确定要删除 ${row.name} 吗?`"
            icon="DeleteFilled"
            icon-color="#f56c6c"
            @confirm="deleteMenu(row)"
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
      :title="menuParams.id ? '编辑菜单' : '添加菜单'"
      width="25%"
    >
      <el-form
        label-width="60px"
        :model="menuParams"
        :rules="rule"
        ref="formRef"
      >
        <el-form-item
          label="名"
          prop="name"
        >
          <el-input
            prefix-icon="EditPen"
            placeholder="请输入名"
            v-model="menuParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="值"
          prop="code"
        >
          <el-input
            prefix-icon="EditPen"
            placeholder="请输入值"
            v-model="menuParams.code"
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
            @click="save"
          >确认</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<style lang="scss" scoped></style>
