<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue'

import type {
  SpuData,
  TradeMarkResponseData,
  SpuImageResponseData,
  SpuSaleAttrResponseData,
  SaleAttrResponseData,
  TradeMark,
  SpuImage,
  SpuSaleAttr,
  SaleAttr,
  SpuSaleAttrValue
} from '@/api/product/spu/type'

import {
  getAllTrademarkAPI,
  getSpuImageListAPI,
  getSpuSaleAttrListAPI,
  getAllSaleAttrAPI,
  addOrUpdateSpuAPI
} from '@/api/product/spu'

let $emit = defineEmits(['changeScene'])

// 子组件点击取消按钮通知父组件改变场景
const cancel = () => {
  $emit('changeScene', 0)
}

// 存储已有的SPU数据
let allTradeMark = ref<TradeMark[]>([])
// 存储已有的SPU图片数据
let imgList = ref<SpuImage[]>([])
// 存储已有的SPU销售属性数据
let saleAttr = ref<SpuSaleAttr[]>([])
// 存储已有的销售属性数据
let allSaleAttr = ref<SaleAttr[]>([])

// 存储已有spu对象
const spuParams = ref<SpuData>({
  category3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
})

// 获取所有品牌数据
const initSpuData = async (row: SpuData) => {
  // 存储已有spu对象
  spuParams.value = row

  imgLoading.value = true

  // 获取全部品牌数据
  // let res1: TradeMarkResponseData = await getAllTrademarkAPI()
  // let res2: SpuImageResponseData = await getSpuImageListAPI((row.id as number))
  // let res3: SpuSaleAttrResponseData = await getSpuSaleAttrListAPI((row.id as number))
  // let res4: SaleAttrResponseData = await getAllSaleAttrAPI()
  // allTradeMark.value = res1.data
  // imgList.value = res2.data
  // saleAttr.value = res3.data
  // allSaleAttr.value = res4.data
  // 获取全部品牌数据
  const res: [TradeMarkResponseData, SpuImageResponseData, SpuSaleAttrResponseData, SaleAttrResponseData] = await Promise.all([
    getAllTrademarkAPI(),
    getSpuImageListAPI((row.id as number)),
    getSpuSaleAttrListAPI((row.id as number)),
    getAllSaleAttrAPI()
  ])
  allTradeMark.value = res[0].data
  imgList.value = res[1].data.map(item => ({ name: item.imgName, url: item.imgUrl }))
  saleAttr.value = res[2].data
  allSaleAttr.value = res[3].data

  imgLoading.value = false
}

const imgLoading = ref(false)
// 预览图片对话框的显示与隐藏
let dialogVisible = ref(false)
let currentImg = ref('')
// 照片墙点击预览
const handlePictureCardPreview = (e: any) => {
  console.log(e)
  currentImg.value = e.url
  dialogVisible.value = true
}
// 照片墙删除某一个
const handleRemove = (uploadFile: any, uploadFiles: any) => {
  console.log(uploadFile, uploadFiles)
}
// 图片上传之前的钩子
const beforeUpload = (rawFile: any) => {
  // 允许的图片格式
  const allowedImageType = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
  if (!allowedImageType.includes(rawFile.type)) {
    ElMessage.error('图片必须是JPG|PNG|GIF格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('图片大小不能超过4MB!')
    return false
  }
  return true
}

// 计算出当前SPU还为拥有的销售属性
let unSelectSaleAttr = computed(() => {
  return allSaleAttr.value.filter(item => (
    saleAttr.value.every(sale => item.name !== sale.saleAttrName)
  ))
})

// 收集还未先择的销售属性ID和属性值的名字
let saleAttrIdAndValueName = ref('')

// 添加销售属性的方法
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  // 准备新的销售属性对象
  let newSaleAttr: SpuSaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: []
  }
  // 追加到数组中
  saleAttr.value.push(newSaleAttr)
  // 清空收集的数据
  saleAttrIdAndValueName.value = ''
}

// 属性值按钮的点击事件
const toEdit = (row: SpuSaleAttr, i: number) => {
  // 点击按钮显示input
  row.flag = true
  row.saleAttrValue = ''

  nextTick(() => {
    inputArr.value[i].focus()
  })
}
// 表单元素失去焦点
const toLook = (row: SpuSaleAttr, i: number) => {
  // 整理收集到的数据
  const { baseSaleAttrId, saleAttrValue } = row
  let newSaleAttrValue: SpuSaleAttrValue = {
    baseSaleAttrId,
    saleAttrName: saleAttrValue
  }

  // 非法情况1
  if ((saleAttrValue as string).trim() === '') {
    row.flag = false
    return ElMessage.warning('属性值不能为空')
  }

  // 判断属性值是否在数组中存在
  let repeat = row.spuSaleAttrValueList.find(item => item.saleAttrName === saleAttrValue)
  if (repeat) {
    ElMessage.warning('属性值已存在')
    nextTick(() => {
      inputArr.value[i].select()
    })
    return
  }

  // 追加新的属性值
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.flag = false
}

// 输入框的所有实例对象
let inputArr = ref([])

// 保存按钮
const save = async () => {
  // 整理参数
  // 1.照片墙数据整理
  spuParams.value.spuImageList = imgList.value.map((item: any) => ({
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url
  }))
  // 2.销售属性数据整理
  spuParams.value.spuSaleAttrList = saleAttr.value
  // 发请求：添加SPU|修改SPU
  const res = await addOrUpdateSpuAPI(spuParams.value)
  if (res.code === 200) {
    ElMessage.success(res.message)
    $emit('changeScene', 0)
  } else {
    ElMessage.error(res.message)
  }
}

// 对外暴露方法，父组件可拿到
defineExpose({
  initSpuData
})
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入SPU名称"
        v-model="spuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId">
        <el-option
          v-for="item in allTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入SPU描述"
        :rows="2"
        v-model="spuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        v-loading="imgLoading"
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        style="margin-right: 10px;"
        :placeholder="unSelectSaleAttr.length ? '请选择销售属性' : '暂无属性供选择'"
        v-model="saleAttrIdAndValueName"
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        />
      </el-select>
      <el-button
        type="primary"
        icon="Plus"
        :disabled="saleAttrIdAndValueName ? false : true"
        @click="addSaleAttr"
      >添加属性值</el-button>

      <el-table
        border
        style="margin: 10px 0;"
        :data="saleAttr"
      >
        <el-table-column
          label="序号"
          type="index"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="属性名"
          width="160px"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="属性值">
          <template #="{ row, $index }">
            <el-tag
              type="success"
              v-for="(item, i) in row.spuSaleAttrValueList"
              :key="item.id"
              style="margin: 3px;"
              closable
              @close="row.spuSaleAttrValueList.splice(i, 1)"
            >{{
                item.saleAttrName }}</el-tag>
            <el-input
              v-if="row.flag"
              v-model="row.saleAttrValue"
              style="width: 150px;"
              size="small"
              placeholder="请输入属性值"
              @blur="toLook(row, $index)"
              :ref="(el: any) => (inputArr[$index] = el)"
            />
            <el-button
              v-else
              type="primary"
              size="small"
              icon="Plus"
              @click="toEdit(row, $index)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="80px"
        >
          <template #="{ row }">
            <el-popconfirm
              title="确定要删除吗?"
              icon="DeleteFilled"
              icon-color="#f56c6c"
              @confirm="saleAttr.splice(saleAttr.indexOf(row), 1)"
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
      >保存</el-button>
      <el-button @click="cancel">取消</el-button>

    </el-form-item>
  </el-form>

  <!-- 照片墙 -->
  <el-dialog
    v-model="dialogVisible"
    width="35%"
  >
    <el-image
      :src="currentImg"
      style="width: 100%; height: 100%;"
      fit="cover"
    ></el-image>
  </el-dialog>
</template>

<style lang="scss" scoped></style>