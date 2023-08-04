<script lang="ts" setup>
let $emit = defineEmits(['changeScene'])

// 子组件点击取消按钮通知父组件改变场景
const cancel = () => {
  $emit('changeScene', 0)
}
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select>
        <el-option label="1"></el-option>
        <el-option label="2"></el-option>
        <el-option label="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入SPU描述"
        :rows="2"
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

<style lang="scss" scoped> </style>