<script lang="ts" setup>
import { ref } from 'vue'

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
} from '@/api/product/spu/type'

import { getAllTrademarkAPI, getSpuImageListAPI, getSpuSaleAttrListAPI, getAllSaleAttrAPI } from '@/api/product/spu'

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
  imgList.value = res[1].data
  saleAttr.value = res[2].data
  allSaleAttr.value = res[3].data
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
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-remove="handleRemove"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select style="margin-right: 10px;">
        <el-option label="1"></el-option>
        <el-option label="2"></el-option>
        <el-option label="3"></el-option>
      </el-select>
      <el-button
        type="primary"
        icon="Plus"
      >添加属性值</el-button>

      <el-table
        border
        style="margin: 10px 0;"
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
        ></el-table-column>
        <el-table-column label="属性值"></el-table-column>
        <el-table-column
          label="操作"
          width="80px"
        >
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
        @click=""
      >保存</el-button>
      <el-button @click="cancel">取消</el-button>

    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>