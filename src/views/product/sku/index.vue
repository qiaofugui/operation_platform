<script lang="ts" setup>
import { ref, onMounted } from "vue"

import { getSkuListAPI, skuUpAPI, skuOffAPI, getSkuInfoAPI } from '@/api/product/sku'

import type { SkuResponseData, SkuData, SkuInfoResponseData } from "@/api/product/sku/type"

let pageNo = ref(1)
let pageSize = ref(5)
let total = ref(0)
let skuList = ref<SkuData[]>([])

// 组件挂载完毕发请求
onMounted(() => {
  getSkuList()
})

const getSkuList = async (page: number = 1) => {
  pageNo.value = page

  const res: SkuResponseData = await getSkuListAPI(pageNo.value, pageSize.value)
  if (res.code === 200) {
    skuList.value = res.data.records
    total.value = res.data.total
  } else {
    ElMessage.error(res.message)
  }
}

// 下拉框改变每页显示条数
const changeSize = () => {
  getSkuList()
}
const changePageNo = (page: number) => {
  getSkuList(page)
}

// 商品上下架操作
const updateSale = async (row: SkuData) => {
  // isSale === 0 未上架; isSale === 1 已上架
  if (row.isSale === 0) {
    const res: any = await skuUpAPI((row.id as number))
    if (res.code !== 200) return ElMessage.error(res.message)
    ElMessage.success(res.message)
    getSkuList(pageNo.value)
  } else {
    const res: any = await skuOffAPI((row.id as number))
    if (res.code !== 200) return ElMessage.error(res.message)
    ElMessage.success(res.message)
    getSkuList(pageNo.value)
  }
}

// 更新sku
const updateSku = () => {
  ElMessage.warning('功能正在开发中...')
}

// 抽屉
let drawer = ref(true)
let loading = ref(false)
let skuInfo = ref<SkuData>({})
// 查看详情
const findSku = async (row: SkuData) => {
  loading.value = true
  drawer.value = true
  const res: SkuInfoResponseData = await getSkuInfoAPI(row.id as number)
  if (res.code !== 200) return ElMessage.error(res.message)
  skuInfo.value = res.data
  loading.value = false

}

</script>

<template>
  <div>
    <el-card>
      <el-table
        border
        style="margin: 10px 0;"
        :data="skuList"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="名称"
          width="150px"
          prop="skuName"
        ></el-table-column>
        <el-table-column
          label="描述"
          prop="skuDesc"
          min-width="300"
        ></el-table-column>
        <el-table-column
          label="默认图片"
          width="150px"
        >
          <template #="{ row }">
            <el-image
              style="width: 100%; height: 100%"
              fit="scale-down"
              :src="row.skuDefaultImg"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="重量(克)"
          prop="weight"
          width="150px"
        ></el-table-column>
        <el-table-column
          label="价格(元)"
          prop="price"
          width="150px"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="260px"
          fixed="right"
        >
          <template #="{ row }">
            <el-tooltip
              effect="dark"
              :content="row.isSale === 0 ? '上线' : '下线'"
              placement="bottom"
            >
              <el-button
                :type="row.isSale === 0 ? 'success' : 'info'"
                :icon="row.isSale === 0 ? 'Top' : 'Bottom'"
                size="small"
                @click="updateSale(row)"
              />
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="编辑"
              placement="bottom"
            >
              <el-button
                type="primary"
                icon="Edit"
                size="small"
                @click="updateSku"
              />
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="信息"
              placement="bottom"
            >
              <el-button
                type="info"
                icon="InfoFilled"
                size="small"
                @click="findSku(row)"
              />
            </el-tooltip>
            <el-popconfirm
              :title="`确定要删除${row}`"
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
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 25, 50]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="changeSize"
        @current-change="changePageNo"
      />
    </el-card>

    <el-drawer
      v-model="drawer"
      direction="rtl"
      size="35%"
    >
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <div v-loading="loading">
          <el-row
            :gutter="5"
            class="mb-15"
          >
            <el-col :span="6">名称</el-col>
            <el-col :span="18">{{ skuInfo.skuName }}</el-col>
          </el-row>
          <el-row
            :gutter="5"
            class="mb-15"
          >
            <el-col :span="6">描述</el-col>
            <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
          </el-row>
          <el-row
            :gutter="5"
            class="mb-15"
          >
            <el-col :span="6">价格</el-col>
            <el-col
              :span="18"
              style="color: #ff5000;"
            >{{ skuInfo.price }}</el-col>
          </el-row>
          <el-row
            :gutter="5"
            class="mb-15"
          >
            <el-col :span="6">平台属性</el-col>
            <el-col :span="18">
              <span v-if="skuInfo.skuAttrValueList?.length <= 0">无</span>
              <el-tag
                style="margin: 3px;"
                v-for="item in skuInfo.skuAttrValueList"
                :key="item.id"
              >{{ item.valueName
              }}</el-tag>
            </el-col>
          </el-row>
          <el-row
            :gutter="5"
            class="mb-15"
          >
            <el-col :span="6">销售属性</el-col>
            <el-col :span="18">
              <span v-if="skuInfo.skuSaleAttrValueList?.length <= 0">无</span>
              <el-tag
                style="margin: 3px;"
                type="success"
                v-for="item in skuInfo.skuSaleAttrValueList"
                :key="item.id"
              >{{
                item.saleAttrValueName }}</el-tag>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="6">商品图片</el-col>
            <el-col :span="18">
              <span v-if="skuInfo.skuImageList?.length <= 0">无</span>
              <el-carousel
                trigger="click"
                height="200px"
              >
                <el-carousel
                  type="card"
                  height="200px"
                >
                  <el-carousel-item
                    v-for="item in skuInfo.skuImageList"
                    :key="item.id"
                  >
                    <el-image
                      :src="item.imgUrl"
                      fit="fill"
                    />
                  </el-carousel-item>
                </el-carousel>
              </el-carousel>
            </el-col>
          </el-row>
        </div>
      </template>
      <template #footer></template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.mb-15 {
  margin-bottom: 15px;
}
.el-carousel__item h3 {
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
</style>
