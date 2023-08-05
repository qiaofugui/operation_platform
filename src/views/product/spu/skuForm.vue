<script lang="ts" setup>
import { ref } from 'vue'

import {
  getAttrListAPI
} from '@/api/product/attr'
import {
  getSpuImageListAPI,
  getSpuSaleAttrListAPI
} from '@/api/product/spu'
import type {
  SpuData,
  SpuImageResponseData,
  SpuSaleAttrResponseData,
  SkuData
} from '@/api/product/spu/type'
import type {
  AttrResponseData,
} from '@/api/product/attr/type'

let $emit = defineEmits(['changeScene'])

// 收集sku参数
let skuParams = ref<SkuData>({
  // 父组件传过来的
  category3Id: '', // 三级分类ID
  spuId: '', // 已有SPU的ID
  tmId: '', // SPU的品牌ID

  // 双向绑定收集的
  skuName: '', // SKU的名称
  price: '', // SKU的价格
  weight: '', // SKU的重量
  skuDesc: '', // SKU的描述信息
  skuAttrValueList: [ // SKU的平台属性
    // {
    //   attrId: '', // 平台属性ID
    //   valueId: '', // 平台属性值ID
    // }
  ],
  skuSaleAttrValueList: [ // SKU的销售属性
    // {
    //   saleAttrId: '', // 销售属性ID
    //   saleValueId: '', // 销售属性值ID
    // }
  ],
  skuDefaultImg: '', // SKU的默认图片
})

// 平台属性
let attrList = ref<any>([])
// 销售属性
let saleAttrList = ref<any>([])
// 照片墙
let imageList = ref<any>([])
const initSkuData = async (c1Id: number | string, c2Id: number | string, row: SpuData) => {
  // 收集数据
  skuParams.value.category3Id = row.category3Id
  skuParams.value.spuId = (row.id as number)
  skuParams.value.tmId = row.tmId

  // // 获取平台属性
  // const res1: AttrResponseData = await getAttrListAPI(c1Id, c2Id, row.category3Id)
  // 获取对应的销售属性
  // const res3: SpuSaleAttrResponseData = await getSpuSaleAttrListAPI((row.id as number))
  // 获取照片墙
  // const res2: SpuImageResponseData = await getSpuImageListAPI((row.id as number))
  // console.log(res1,res2,res3)
  const res: [AttrResponseData, SpuSaleAttrResponseData, SpuImageResponseData] = await Promise.all([
    getAttrListAPI(c1Id, c2Id, row.category3Id),
    getSpuSaleAttrListAPI((row.id as number)),
    getSpuImageListAPI((row.id as number))
  ])
  attrList.value = res[0].data
  saleAttrList.value = res[1].data
  imageList.value = res[2].data
}

// 取消按钮的回调
const cancel = () => {
  $emit('changeScene', { flag: 0, params: 'update' })
}

defineExpose({
  initSkuData
})
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        v-model="skuParams.skuName"
        placeholder="请输入SPU名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        v-model="skuParams.price"
        type="number"
        placeholder="请输入价格(元)"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input
        v-model="skuParams.weight"
        type="number"
        placeholder="请输入重量(克)"
      ></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        v-model="skuParams.skuDesc"
        type="textarea"
        placeholder="请输入SKU描述"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form>
        <el-row
          :gutter="20"
          style="margin-bottom: 10px;"
        >
          <el-col
            :span="8"
            v-for="item in attrList"
            :key="item.id"
          >
            <el-form-item
              :label="item.attrName"
              label-width="100px"
              style="margin-bottom: 10px;overflow: hidden;"
            >
              <el-select>
                <el-option
                  v-for="attrValue in item.attrValueList"
                  :key="attrValue.id"
                  :label="attrValue.valueName"
                  :value="attrValue.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-form-item>
    <el-form-item>

    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item
          v-for="item in saleAttrList"
          :key="item.id"
          :label="item.saleAttrName"
        >
          <el-select>
            <el-option
              v-for="saleAttrValue in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
              :value="saleAttrValue.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table
        border
        :data="imageList"
      >
        <el-table-column
          type="selection"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="图片">
          <template #="{ row }">
            <el-image
              style="width: 100px; height: 100px;"
              :src="row.imgUrl"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="名称"
          prop="imgName"
        ></el-table-column>
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button
              type="primary"
              @click=""
            >设置默认</el-button>
            <el-button
              type="primary"
              @click=""
            >设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
