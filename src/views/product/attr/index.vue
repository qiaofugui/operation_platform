<script lang="ts" setup></script>

<template>
  <div>
    <Category />

    <el-card style="margin: 10px 0;">
      <el-button type="primary">
        <IEpPlus />
        添加属性
      </el-button>
      <el-table
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
          label="属性名称"
          width="120px"
        />
        <el-table-column
          prop="logoUrl"
          label="属性名称值"
        >
          <template #="{ row }">

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
              @click=""
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
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
