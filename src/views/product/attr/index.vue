<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { getAttrListAPI, addOrUpdateAttrAPI } from '@/api/product/attr'

import type { AttrResponseData, AttrValueList, AttrValue } from '@/api/product/attr/type'

const categoryStore = useCategoryStore()

const loading = ref(false)

const attrList = ref<AttrValueList[]>([])
watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return (attrList.value = [])
    getAttrList()
  }
)
const getAttrList = async () => {
  loading.value = true
  const { c1Id, c2Id, c3Id } = categoryStore
  const res: AttrResponseData = await getAttrListAPI(c1Id, c2Id, c3Id)
  if (res.code === 200) {
    attrList.value = res.data
    loading.value = false
  } else {
    loading.value = false
  }
}

// 收集新增或修改属性的数据
const attrParams = reactive<AttrValueList>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3
})
// 定义卡片组件内容切换 table 和添加
const scene = ref(false)
const addAttr = () => {
  // 每一次点击的时候先清空数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3
  })
  scene.value = false
}
const updateAttr = (row: AttrValueList) => {
  console.log(row)
  scene.value = false
}
// 取消添加
const cancel = () => {
  scene.value = true
}

// 添加属性值按钮
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true
  })
}

// 保存发送请求
const save = async () => {
  const res: any = await addOrUpdateAttrAPI(attrParams)
  if (res.code === 200) {
    getAttrList()
    scene.value = true
    ElMessage.success(res.message)
  } else {
    ElMessage.error(res.message)
  }
}

// 失去焦点
const toLook = (row: AttrValue, $index: number) => {
  // 非法清空判断1
  if (row.valueName.trim() === '') {
    attrParams.attrValueList.splice($index, 1)
    return ElMessage.warning('属性值不能为空')
  }
  // 非法清空判断2
  let repeat = attrParams.attrValueList.find(item => item !== row && item.valueName === row.valueName)
  if (repeat) {
    attrParams.attrValueList.splice($index, 1)
    return ElMessage.warning('属性值不能重复')
  }

  row.flag = false
}
// 点击编辑
const toEdit = (row: AttrValue) => {
  row.flag = true
}
</script>

<template>
  <div>
    <Category :scene="scene" />

    <el-card style="margin: 10px 0">
      <div v-show="scene">
        <el-button
          type="primary"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addAttr"
        >
          <IEpPlus />
          添加属性
        </el-button>
        <el-table
          v-loading="loading"
          element-loading-text="数据正在加载中"
          border
          style="margin: 10px 0"
          :data="attrList"
        >
          <el-table-column
            prop="id"
            label="序号"
            width="80px"
            align="center"
            type="index"
          />
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="120px"
          />
          <el-table-column
            prop="attrValueList"
            label="属性名称值"
          >
            <template #="{ row }">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin: 3px"
              >{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            width="120px"
          >
            <template #="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateAttr(row)"
              />
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
                  />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 展示添加和修改属性的结构 -->
      <div v-show="scene === false">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          :disabled="attrParams.attrName.trim().length > 0 ? false : true"
          @click="addAttrValue"
        >添加属性值</el-button>
        <el-button @click="cancel">取消</el-button>
        <el-table
          border
          style="margin: 20px 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            width="80px"
            type="index"
            align="center"
            label="序号"
          ></el-table-column>
          <el-table-column label="属性值">
            <template #="{ row, $index }">
              <el-input
                placeholder="请输入属性值"
                size="small"
                v-model="row.valueName"
                v-if="row.flag"
                @blur="toLook(row, $index)"
              ></el-input>
              <div
                v-else
                @click="toEdit(row)"
              >{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
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
                  />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
