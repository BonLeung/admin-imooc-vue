<template>
  <el-form ref="postForm" :model="postForm" label-position="left">
    <sticky :class-name="'sub-navbar'">
      <el-button v-if="!isEdit" @click="showGuide">显示帮助</el-button>
      <el-button v-loading="loading" style="margin-left: 20px;" @click="submitForm">{{ isEdit ? '编辑电子书' : '新增电子书' }}</el-button>
    </sticky>
    <div class="detail-container">
      <el-row>
        <warning />
        <el-col :span="24">
          <ebook-upload
            :file-list="fileList"
            :disabled="isEdit"
            @onSuccess="onUploadSuccess"
            @onRemove="onUploadRemove"
          />
        </el-col>
        <el-col :span="24">
          <el-form-item prop="title">
            <MDInput
              v-model="postForm.name"
              :maxlength="100"
              name="name"
              required
            >
              书名：
            </MDInput>
          </el-form-item>
          <el-row gutter="100">
            <el-col :span="12">
              <el-form-item label="作者：" :label-width="labelWidth">
                <el-input
                  v-model="postForm.author"
                  placeholder="作者"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出版社：" :label-width="labelWidth">
                <el-input
                  v-model="postForm.publisher"
                  placeholder="出版社"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row gutter="100">
            <el-col :span="12">
              <el-form-item label="语言：" :label-width="labelWidth">
                <el-input
                  v-model="postForm.language"
                  placeholder="语言"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="根文件：" :label-width="labelWidth">
                <el-input
                  v-model="postForm.rootFile"
                  placeholder="根文件"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row gutter="100">
            <el-col :span="12">
              <el-form-item label="文件路径：" :label-width="labelWidth">
                <el-input
                  v-model="postForm.filePath"
                  placeholder="文件路径"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="解压路径：" :label-width="labelWidth">
                <el-input
                  v-model="postForm.unzipPath"
                  placeholder="解压路径"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row gutter="100">
            <el-col :span="12">
              <el-form-item label="封面路径：" :label-width="labelWidth">
                <el-input
                  v-model="postForm.coverPath"
                  placeholder="封面路径"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文件名称：" :label-width="labelWidth">
                <el-input
                  v-model="postForm.fileName"
                  placeholder="文件名称"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row gutter="100">
            <el-col :span="24">
              <el-form-item label="封面：" :label-width="labelWidth">
                <a v-if="postForm.cover" :href="postForm.cover" target="_blank">
                  <img :src="postForm.cover" alt="" class="preview-img">
                </a>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row gutter="100">
            <el-col :span="24">
              <el-form-item label="目录" :label-width="labelWidth">
                <div v-if="postForm.content && postForm.content.length > 0" class="content-wrapper">
                  <el-tree :data="contentsTree" @node-click="onContentClick" />
                </div>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
import Sticky from '../../../components/Sticky/index'
import Warning from './Warning'
import EbookUpload from '../../../components/EbookUpload/index'
import MDInput from '../../../components/MDinput/index'

export default {
  components: {
    Sticky,
    Warning,
    EbookUpload,
    MDInput
  },
  props: {
    isEdit: Boolean
  },
  data() {
    return {
      loading: false,
      postForm: {
        status: 'delete'
      },
      fileList: [],
      labelWidth: '120px'
    }
  },
  methods: {
    submitForm() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
      }, 3000)
    },
    showGuide() {
      console.log('show guide...')
    },
    onUploadSuccess() {
      console.log('onUploadSuccess')
    },
    onUploadRemove() {
      console.log('onUploadRemove')
    }
  }
}
</script>

<style lang="scss">
.detail-container {
  padding: 40px 50px 20px;
}
</style>
