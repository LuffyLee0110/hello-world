<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" class="form-container">
      <div class="createPost-main-container">
        <el-col :span="24">
          <div class="postInfo-container">
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="80px" label="应用名称:" >
                  <el-input placeholder="请输入应用名称" clearable style="width:80%;"/>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label-width="80px" label="团队名称:" class="postInfo-container-item">
                  <el-select v-model="postForm.author" :remote-method="getRemoteUserList" filterable remote placeholder="请选择团队名称" style="width:180%;">
                    <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="80px" label="应用包名:" >
                  <el-input placeholder="请输入应用包名/bundlID" clearable style="width:80%;"/>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label-width="80px" label="应用类型:" class="postInfo-container-item">
                  <el-select v-model="postForm.appType" filterable remote placeholder="请选择应用类型" style="width:180%;">
                    <el-option v-for="item in appTypetOptions" :key="item.value" :label="item.label" :value="item.value"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="90px" label="应用版本号:" >
                  <el-input placeholder="请输入应用版本号" clearable style="width:80%;"/>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label-width="90px" label="应用短链接:" >
                  {{ url }}
                  <div style="width:10px;"><el-input /></div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item style="margin-bottom: 40px;" label-width="80px" label="摘要:">
                <el-input :rows="1" v-model="postForm.content_short" type="textarea" class="article-textarea" autosize placeholder="请输入内容"/>
                <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
              </el-form-item>
            </el-row>
          </div>
        </el-col>
      </div>
    </el-form>
  </div>
</template>

<script>
const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0,
  appType: ''
}

export default {
  name: 'AppUpload',
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      appTypetOptions: [{
        value: '0',
        label: 'Windows'
      }, {
        value: '1',
        label: 'Android'
      }, {
        value: '2',
        label: 'iOS'
      }],
      url: 'https://www.xxxx.com'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
