<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue"

import {
  getRoleListAPI,
  addOrUpdateRoleAPI,
  batchDeleteRoleAPI,
  deleteRoleAPI,
  getPermissionAPI,
  setPermissionAPI
} from '@/api/acl/role'
import type {
  RoleResponseData,
  Role
} from '@/api/acl/role/type'

import useSettingStore from '@/store/modules/setting'
let settingStore = useSettingStore()

// 分页器默认页码
let pageNo = ref(1)
// 分页器默认每页条数
let pageSize = ref(3)
// 分页器默认总条数
let total = ref(0)
let loading = ref(false)

let roleList = ref<any[]>([{}])

const changePageNo = (page: number) => {
  getRoleList(page)
}
// 下拉框改变每页显示条数
const changeSize = () => {
  getRoleList()
}

const getRoleList = async (page: number = 1) => {
  pageNo.value = page

  loading.value = true

  const res: RoleResponseData = await getRoleListAPI(pageNo.value, pageSize.value, keyword.value)
  if (res.code !== 200) return ElMessage.error(res.message)
  roleList.value = res.data.records
  total.value = res.data.total
  loading.value = false
}

onMounted(() => {
  getRoleList()
})

// 头部用户搜索功能
let keyword = ref('')
const search = () => {
  getRoleList()
}
// 重置按钮
const reset = () => {
  settingStore.changeRefresh()
}

// 控制添加、更新职位的dialog
let dialogFormVisible = ref(false)
// 收集新增更新职位的数据
let roleParams = ref<Role>({
  roleName: ''
})
// 表单实例
let roleForm = ref<any>(null)

// 添加职位
const addRole = () => {
  // 打开前清空表单
  Object.assign(roleParams.value, {
    roleName: '',
    id: 0
  })
  // 清空校验提示信息
  nextTick(() => {
    roleForm.value.clearValidate()
  })

  dialogFormVisible.value = true
}

// 更新职位
const updateRole = (row: Role) => {
  // 打开前回填表单
  Object.assign(roleParams.value, {
    id: row.id,
    roleName: row.roleName
  })
  // 清空校验提示信息
  nextTick(() => {
    roleForm.value.clearValidate()
  })
  dialogFormVisible.value = true
}

// 校验规则
const rules = ref({
  roleName: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ]
})

// 确认添加角色按钮
const save = async () => {
  const res = await addOrUpdateRoleAPI(roleParams.value)
  if (res.code !== 200) return ElMessage.error(res.message)
  ElMessage.success(res.message)
  getRoleList(roleParams.value.id ? pageNo.value : 1)
  dialogFormVisible.value = false
}

// 要批量删除的用户数据
let deleteRoles = ref<Role[]>([])
// 第一行复选框发生变化时事件
const handleSelectionChange = (e: Role[]) => {
  deleteRoles.value = e
}

//批量删除按钮
const batchDeleteRole = async () => {
  // 处理数据
  let data = deleteRoles.value.map((item: Role) => item.id)

  const res: any = await batchDeleteRoleAPI((data as string[]))
  if (res.code !== 200) return ElMessage.error(res.message)
  ElMessage.success(res.message)
  // 删除完检查当前页面是否还有数据没有跳转到第一页
  getRoleList(roleList.value.length > 1 ? pageNo.value : 1)
}

// 删除单个角色
const deleteRole = async (row: Role) => {
  const res: any = await deleteRoleAPI ((row.id as number))
  if (res.code !== 200) return ElMessage.error(res.message)
  ElMessage.success(res.message)
  // 删除完检查当前页面是否还有数据没有跳转到第一页
  getRoleList(roleList.value.length > 1 ? pageNo.value : 1)
}

// 分配权限功能
// 控制抽屉显示隐藏
let drawer = ref(false)
// 定义存储用户权限的数组
let permission = ref<any>([])
const defaultProps = {
  children: 'children',
  label: 'name',
}
// 已勾选的权限节点的id（四级）
let selectArr = ref<number[]>()

let permissionLoading = ref(false)

// 分配权限按钮点击事件
const setPermission = async (row: Role) => {
  Object.assign(roleParams.value, row)
  drawer.value = true

  permissionLoading.value = true

  const res = await getPermissionAPI((row.id as number))
  if (res.code !== 200) return ElMessage.error(res.message)
  permission.value = res.data
  selectArr.value = filterSelectArr(permission.value, [])

  permissionLoading.value = false
}

const filterSelectArr = (allData: any, initArr: number[]) => {
  allData.map((item: any) => {
    if(item.select && item.level === 4) initArr.push(item.id)
    if(item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}

let tree = ref<any>(null)
// 抽屉确定分配权限按钮
const handler = async () => {
  // 职位id
  const roleId = (roleParams.value.id as number)
  // 获取选中节点的Id tree组件实例上有方法
  let arr = tree.value.getCheckedKeys()
  // 半选的 id
  let arr1 = tree.value.getHalfCheckedKeys()

  let permissionId = [...arr, ...arr1]
  let res: any = await setPermissionAPI(roleId, permissionId)
  // 下发权限
  if (res.code !== 200) return ElMessage.error(res.message)
  ElMessage.success(res.message)
  // getRoleList(pageNo.value)
  // drawer.value = false
  window.location.reload()
}

// // 树形控件测试
// const defaultProps = {
//   children: 'children',
//   label: 'label',
// }
// let data = [
//   {
//     id: 1,
//     label: 'Level one 1',
//     children: [
//       {
//         id: 4,
//         label: 'Level two 1-1',
//         children: [
//           {
//             id: 9,
//             label: 'Level three 1-1-1',
//           },
//           {
//             id: 10,
//             label: 'Level three 1-1-2',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     label: 'Level one 2',
//     children: [
//       {
//         id: 5,
//         label: 'Level two 2-1',
//       },
//       {
//         id: 6,
//         label: 'Level two 2-2',
//       },
//     ],
//   },
//   {
//     id: 3,
//     label: 'Level one 3',
//     children: [
//       {
//         id: 7,
//         label: 'Level two 3-1',
//       },
//       {
//         id: 8,
//         label: 'Level two 3-2',
//       },
//     ],
//   },
// ]
</script>

<template>
  <div>
    <el-card style="height: 75px;">
      <el-form
        :inline="true"
        class="form"
      >
        <el-form-item label="角色名称">
          <el-input
            v-model="keyword"
            placeholder="输入角色名称进行搜索"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="!keyword"
            @click="search"
          >搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin: 10px 0;">
      <el-button
        type="primary"
        @click="addRole"
        icon="Plus"
      >添加职位</el-button>
      <el-popconfirm
        :title="`确定要批量删除选中的用户吗?`"
        icon="DeleteFilled"
        icon-color="#f56c6c"
        @confirm="batchDeleteRole"
      >
        <template #reference>
          <el-button
            type="danger"
            icon="DeleteFilled"
            :disabled="deleteRoles.length ? false : true"
          >批量删除</el-button>
        </template>
      </el-popconfirm>

      <el-table
        v-loading="loading"
        style="margin: 10px 0;"
        border
        :data="roleList"
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
          align="center"
          width="60px"
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
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
              @click="setPermission(row)"
            >分配权限</el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateRole(row)"
            >编辑</el-button>
            <el-popconfirm
              :title="`确定要删除 ${row.roleName} 吗?`"
              icon="DeleteFilled"
              icon-color="#f56c6c"
              @confirm="deleteRole(row)"
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

    <!-- 添加角色和更新角色dialog -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="roleParams.id ? '更新角色' : '添加角色'"
      width="30%"
    >
      <el-form
        :model="roleParams"
        :rules="rules"
        ref="roleForm"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
        >
          <el-input
            v-model="roleParams.roleName"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button
            type="primary"
            @click="save"
            :disabled="roleParams.roleName.trim().length >= 2 ? false : true"
          >确认</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 抽屉组件：分配权限 -->
    <el-drawer
      v-model="drawer"
      size="25%"
    >
      <template #header>
        <h2>分配角色权限</h2>
      </template>
      <template #default>
        <div v-loading="permissionLoading">
          <!-- 树形控件 -->
          <el-tree
            :data="permission"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="selectArr"
            :props="defaultProps"
            ref="tree"
          />
        </div>
      </template>
      <template #footer>
        <el-button
          type="primary"
          @click="handler"
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
