<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'

import {
  getTrademarkListAPI,
  addOrUpdateTrademarkAPI,
  deleteTrademarkAPI,
} from '@/api/product/trademark'

import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'

import type { UploadProps } from 'element-plus'

// 当前页
const pageNo = ref<number>(1)
// 每页显示条数
const limit = ref<number>(3)
const total = ref<number>(0)
const trademarkList = ref<Records>([])

const srcPreviewList = ref<string[]>([])

// 获取品牌列表数据
const getTrademarkList = async (pager = 1) => {
  pageNo.value = pager

  const res: TradeMarkResponseData = await getTrademarkListAPI(
    pageNo.value,
    limit.value,
  )
  if (res.code === 200) {
    // 存储数据总条数
    total.value = res.data.total
    trademarkList.value = res.data.records

    srcPreviewList.value =  res.data.records.map(item=>item.logoUrl)
  }
}
onMounted(() => {
  getTrademarkList()
})
const changePageNo = (page: number) => {
  getTrademarkList(page)
}
// 下拉框改变每页显示条数
const changeSize = () => {
  getTrademarkList()
}

const dialogFormVisible = ref<boolean>(false)
// 新增品牌数据
const trademarkParams = ref<TradeMark>({
  id: undefined,
  tmName: '',
  logoUrl: '',
})
let trademarkFormRef: any = ref(null)
// 自定义校验规则
const validatorLogoUrl = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('请上传品牌LOGO'))
  } else {
    callback()
  }
}
const rules = ref({
  tmName: [
    { required: true, message: '请输入品牌名', trigger: 'blur' },
  ],
  logoUrl: [
    { required: true, trigger: 'change', validator: validatorLogoUrl },
  ],
})

// 添加品牌
const addTrademark = () => {
  dialogFormVisible.value = true
  trademarkParams.value = {
      id: undefined,
      tmName: '',
      logoUrl: '',
    }
    nextTick(() => {
      trademarkFormRef.value.clearValidate()
    })
}
// 修改品牌
const updateTrademark = (row: TradeMark) => {
  dialogFormVisible.value = true
  trademarkParams.value = {
      id: row.id,
      tmName: row.tmName,
      logoUrl: row.logoUrl,
    }
}
// 取消添加
const cancel = () => {
  dialogFormVisible.value = false
}
// 确认添加
const confirm = async () => {
  // 表单校验
  await trademarkFormRef.value.validate()

  // dialogFormVisible.value = false
  const res = await addOrUpdateTrademarkAPI(trademarkParams.value)
  if (res.code === 200) {
    // 关闭对话框
    dialogFormVisible.value = false
    ElMessage.success(res.message)
    getTrademarkList()
  } else {
    ElMessage.error(res.message)
    dialogFormVisible.value = false
  }
}

// 删除品牌
const deleteTrademark = async (row: TradeMark) => {
  const res = await deleteTrademarkAPI(row.id)
  if (res.code === 200) {
    ElMessage.success(res.message)
    getTrademarkList(trademarkList.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage.error(res.message)
  }
}

const uploadFlag = ref<boolean>(false)
// 图片上传之前的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  uploadFlag.value = true
  // 允许的图片格式
  const allowedImageType = ['image/jpeg', 'image/png', 'image/gif']
  if (!allowedImageType.includes(rawFile.type)) {
    ElMessage.error('图片必须是JPG|PNG|GIF格式!')
    uploadFlag.value = false
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('图片大小不能超过4MB!')
    uploadFlag.value = false
    return false
  }
  return true
}
// 图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  uploadFlag.value = false
  // 收集地址
  trademarkParams.value.logoUrl = response.data
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)

  // 上传成功，清除LOGO校验
  trademarkFormRef.value.clearValidate('logoUrl')
}
</script>

<template>
  <el-card>
    <el-button
      type="primary"
      @click="addTrademark"
    >
      <IEpPlus />
      添加品牌
    </el-button>
    <el-table
      :data="trademarkList"
      border
      style="margin: 10px 0"
    >
      <el-table-column
        prop="id"
        label="序号"
        width="80px"
        align="center"
        type="index"
      />
      <el-table-column
        prop="tmName"
        label="品牌名称"
      />
      <el-table-column
        prop="logoUrl"
        label="品牌LOGO"
      >
        <template #="{ row }">
          <el-image
            style="width: 60px; height: 60px"
            fit="scale-down"
            :src="row.logoUrl"
            :preview-src-list="srcPreviewList"
            :preview-teleported="true"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="品牌操作"
      >
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateTrademark(row)"
          />
          <el-popconfirm
            title="确定要删除吗?"
            icon="DeleteFilled"
            icon-color="#f56c6c"
            @confirm="deleteTrademark(row)"
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
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 10, 30]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="changeSize"
      @current-change="changePageNo"
    />
  </el-card>
  <!-- 对话框组件 -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    width="40%"
  >
    <el-form
      label-width="100px"
      :model="trademarkParams"
      :rules="rules"
      ref="trademarkFormRef"
    >
      <el-form-item
        label="品牌名称"
        prop="tmName"
      >
        <el-input
          placeholder="请输入品牌名称"
          v-model="trademarkParams.tmName"
        />
      </el-form-item>
      <el-form-item
        label="品牌LOGO"
        :disabled="true"
        prop="logoUrl"
      >
        <!--
          action: 上传的地址
          :show-file-list: 是否显示已上传文件列表
          :on-success: 文件上传成功时的钩子
          :before-upload: 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传
        -->
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :disabled="uploadFlag"
        >
          <el-image
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
            fit="scale-down"
            v-loading="uploadFlag"
          />
          <el-icon
            v-else
            v-loading="uploadFlag"
            class="avatar-uploader-icon"
          >
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button
          type="primary"
          @click="confirm"
        >
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  /* border: 1px dashed var(--el-border-color); */
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border 0.3s ease-in-out;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
}
</style>
