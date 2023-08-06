<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue"

import { getAllUserAPI, addOrUpdateUserAPI } from "@/api/acl/user"
import type { UserResponseData, User } from "@/api/acl/type"

// 分页器默认页码
let pageNo = ref(1)
// 分页器默认每页条数
let pageSize = ref(3)
// 分页器默认总条数
let total = ref(0)

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

  const res: UserResponseData = await getAllUserAPI(pageNo.value, pageSize.value)
  if (res.code !== 200) return ElMessage.error(res.message)
  userList.value = res.data.records
  total.value = res.data.total
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
  console.log(row)
  // 清空上一次表单提示信息
  nextTick(() => {
    userForm.value.clearValidate()
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
  getAllUser(userParams.id ? pageNo.value : 1 )
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
        @click="addUser"
      >添加</el-button>
      <el-button
        type="danger"
        @click=""
      >批量删除</el-button>

      <el-table
        style="margin: 10px 0;"
        border
        :data="userList"
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
              @click=""
            >分配角色</el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateUser(row)"
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
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button
          type="primary"
          @click="save"
        >确定</el-button>
        <el-button @click="drawer = false">取消</el-button>
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
