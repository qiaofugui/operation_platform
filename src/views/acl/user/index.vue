<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue"

import {
  getAllUserAPI,
  addOrUpdateUserAPI,
  getAllRoleAPI,
  setRoleAPI,
  deleteUserAPI,
  batchDeleteUserAPI
} from "@/api/acl/user"
import type {
  UserResponseData,
  User,
  RoleResponseData,
  Role,
  SetRole
} from "@/api/acl/type"

import useSettingStore from '@/store/modules/setting'
let settingStore = useSettingStore()

// 分页器默认页码
let pageNo = ref(1)
// 分页器默认每页条数
let pageSize = ref(3)
// 分页器默认总条数
let total = ref(0)
let loading = ref(false)

let userList = ref<User[]>([])

const changePageNo = (page: number) => {
  getAllUser(page)
}
// 下拉框改变每页显示条数
const changeSize = () => {
  getAllUser()
}

const getAllUser = async (page: number = 1) => {
  pageNo.value = page

  loading.value = true

  const res: UserResponseData = await getAllUserAPI(pageNo.value, pageSize.value, keyword.value)
  if (res.code !== 200) return ElMessage.error(res.message)
  userList.value = res.data.records
  total.value = res.data.total
  loading.value = false
}

onMounted(() => {
  getAllUser()
})

// 控制抽屉显示与隐藏
let drawer = ref(false)
// 收集用户信息
let userForm = ref(null)
let userParams = ref<User>({
  username: '',
  name: '',
  password: '',
  rePassword: ''
})
// 自定义校验用户名
const validatorUsername = (rule: any, value: any, callback: any) => {
  // 用户名|昵称长度最少五位
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户名称长度最少五位'))
  }
}
const validatorName = (rule: any, value: any, callback: any) => {
  // 用户名|昵称长度最少五位
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户昵称长度最少五位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户密码长度最少六位'))
  }
}
const validatorRePassword = (rule: any, value: any, callback: any) => {
  if (value === userParams.value.password) {
    callback()
  } else {
    callback(new Error('两次密码不一致'))
  }
}
// 表单规则校验对象
let rulesForm = ref({
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
  rePassword: [{ required: true, trigger: 'change', validator: validatorRePassword }]
})

// 添加用户
const addUser = () => {
  // 每次打开清空
  Object.assign(userParams.value, {
    id: 0,
    username: '',
    name: '',
    password: '',
    rePassword: ''
  })
  // 清空上一次表单提示信息
  nextTick(() => {
    userForm.value.clearValidate()
  })
  drawer.value = true
}
// 添更新用户
const updateUser = (row: User) => {
  // 清空上一次表单提示信息
  nextTick(() => {
    userForm.value?.clearValidate()
  })
  // 存储收集已有的账号信息
  Object.assign(userParams.value, row)
  drawer.value = true
}

// 保存按钮
const save = async () => {
  // 表单校验
  await userForm.value.validate()
  // 添加或更新
  const res: any = await addOrUpdateUserAPI(userParams.value)
  if (res.code !== 200) return ElMessage.error(res.message)
  drawer.value = false
  ElMessage.success(res.message)
  getAllUser(userParams.id ? pageNo.value : 1)
}

// 职位分配
let drawer1 = ref(false)
// 全部权限
let allRole = ref<Role>([])
// 用户已选择权限
let userRole = ref<Role>([])
// 分配角色按钮
const setRole = async (row: User) => {
  // 存储已有用户信息
  Object.assign(userParams.value, row)

  // 获取职位接口
  const res: RoleResponseData = await getAllRoleAPI(row.id)
  if (res.code !== 200) return ElMessage.error(res.message)
  allRole.value = res.data.allRolesList
  userRole.value = res.data.assignRoles

  drawer1.value = true
}
// 全选复选框
let checkAll = ref(false)
let isIndeterminate = ref(false)
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
const handleCheckedRoleChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}

// 确定用户角色
const setRoleSave = async () => {
  // 收集处理数据
  let data: SetRole = {
    userId: (userParams.value.id as number),
    roleIdList: userRole.value.map((item: Role) => (item.id as number))
  }
  const res: any = await setRoleAPI(data)
  if (res.code !== 200) return ElMessage.error(res.message)
  ElMessage.success(res.message)
  getAllUser(pageNo.value)
  drawer1.value = false
}

// 单个删除用户
const deleteUser = async (row: User) => {
  const res: any = await deleteUserAPI(row.id)
  if (res.code !== 200) return ElMessage.error(res.message)
  ElMessage.success(res.message)
  // 删除完检查当前页面是否还有数据没有跳转到第一页
  getAllUser(userList.value.length > 1 ? pageNo.value : 1)
}

// 要批量删除的用户数据
let deleteUsers = ref<User[]>([])
// 第一行复选框发生变化时事件
const handleSelectionChange = (e: User[]) => {
  deleteUsers.value = e
}

//批量删除按钮
const batchDeleteUser = async () => {
  // 处理数据
  let data = deleteUsers.value.map((item: User) => item.id)

  const res: any = await batchDeleteUserAPI(data)
  if (res.code !== 200) return ElMessage.error(res.message)
  ElMessage.success(res.message)
  // 删除完检查当前页面是否还有数据没有跳转到第一页
  getAllUser(userList.value.length > 1 ? pageNo.value : 1)
}

// 测试复选框
// let checkAll = ref(false)
// let isIndeterminate = ref(false)
// let allRole = ref<any>(['前台', '后台', '超级管理员', '测试','a'])
// let userRole = ref<any>(['超级管理员', '测试'])
// const handleCheckAllChange = (val: boolean) => {
//   userRole.value = val ? allRole.value : []
//   isIndeterminate.value = false
// }
// const handleCheckedRoleChange = (value: string[]) => {
//   const checkedCount = value.length
//   checkAll.value = checkedCount === allRole.value.length
//   isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
// }

// 头部用户搜索功能
let keyword = ref('')
const search = () => {
  getAllUser()
}
// 重置按钮
const reset = () => {
  settingStore.changeRefresh()
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
          <el-input
            v-model="keyword"
            placeholder="输入用户名进行搜索"
            prefix-icon="Search"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="Search"
            :disabled="!keyword"
            @click="search"
          >搜索</el-button>
          <el-button
            icon="Refresh"
            @click="reset"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin: 10px 0;">
      <el-button
        type="primary"
        icon="Plus"
        @click="addUser"
      >添加</el-button>
      <el-popconfirm
        :title="`确定要批量删除选中的用户吗?`"
        icon="DeleteFilled"
        icon-color="#f56c6c"
        @confirm="batchDeleteUser"
      >
        <template #reference>
          <el-button
            type="danger"
            icon="Delete"
            :disabled="deleteUsers.length ? false : true"
          >批量删除</el-button>
        </template>
      </el-popconfirm>

      <el-table
        v-loading="loading"
        style="margin: 10px 0;"
        border
        :data="userList"
        @selection-change="handleSelectionChange"
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
          prop="name"
          label="昵称"
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="用户角色"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          show-overflow-tooltip
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
              @click="setRole(row)"
            >分配角色</el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateUser(row)"
            >编辑</el-button>
            <el-popconfirm
              :title="`确定要删除 ${row.username} 吗?`"
              icon="DeleteFilled"
              icon-color="#f56c6c"
              @confirm="deleteUser(row)"
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

    <!-- 抽屉结构添加新用户|更新用户 -->
    <el-drawer
      v-model="drawer"
      size="25%"
    >
      <template #header>
        <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
      </template>
      <template #default>
        <el-form
          label-width="80px"
          :model="userParams"
          :rules="rulesForm"
          ref="userForm"
        >
          <el-form-item
            label="用户名称"
            prop="username"
          >
            <el-input
              v-model="userParams.username"
              placeholder="请输入用户名称"
              prefix-icon="User"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="用户昵称"
            prop="name"
          >
            <el-input
              v-model="userParams.name"
              placeholder="请输入用户昵称"
              prefix-icon="User"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="用户密码"
            prop="password"
            v-if="!userParams.id"
          >
            <el-input
              v-model="userParams.password"
              type="password"
              show-password
              placeholder="请输入密码"
              prefix-icon="Lock"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="rePassword"
            v-if="!userParams.id"
          >
            <el-input
              v-model="userParams.rePassword"
              type="password"
              show-password
              placeholder="请确认密码"
              prefix-icon="Lock"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button
          type="primary"
          icon="Select"
          @click="save"
        >确定</el-button>
        <el-button
          icon="CloseBold"
          @click="drawer = false"
        >取消</el-button>
      </template>
    </el-drawer>

    <!-- 某一个已有账号职位分配 -->
    <el-drawer
      v-model="drawer1"
      size="25%"
    >
      <template #header>
        <h2>分配用户角色</h2>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户名称">
            <el-input
              v-model="userParams.username"
              prefix-icon="User"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <div>
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
            </div>
            <el-checkbox-group
              v-model="userRole"
              @change="handleCheckedRoleChange"
            >
              <el-checkbox
                v-for="role in allRole"
                :key="role.id"
                :label="role"
              >{{ role.roleName }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button
          type="primary"
          icon="Select"
          @click="setRoleSave"
        >确定</el-button>
        <el-button
          icon="CloseBold"
          @click="drawer1 = false"
        >取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
