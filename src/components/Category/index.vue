<script lang="ts" setup></script>

<template>
  <el-card>
    <el-form :inline="true">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="一级分类">
            <el-select>
              <el-option label="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="二级分类">
            <el-select>
              <el-option label="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="三级分类">
            <el-select>
              <el-option label="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped></style>
