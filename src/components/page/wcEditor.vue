<template>
  <el-col :span="12" :offset="4">
    <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" prop="time">
        <el-date-picker v-model="formData.time" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="文章作者" prop="author">
        <el-input v-model="formData.author"></el-input>
      </el-form-item>
      <el-form-item label="上传缩略图" prop="wc_head_img">
        <el-upload class="avatar-uploader" action="/upload" ref="uploader" :show-file-list="false" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload" :on-change="changeLoad" :auto-upload="false">
          <img v-if="formData.wc_head_img" :src="formData.wc_head_img" class="avatar" v-model="formData.imageUrl">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="原创" prop="original">
        <el-radio v-model="formData.original" :label="1">是</el-radio>
        <el-radio v-model="formData.original" :label="2">否</el-radio>
        <i>(勾选”是“，文章会打上原创标签)</i>
      </el-form-item>
      <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
      <el-button class="editor-btn" type="primary" @click="isSubmit(1)">发布</el-button>
      <el-button class="editor-btn" type="primary" @click="isSubmit(0)" v-if="is_draft">存草稿</el-button>
    </el-form>
  </el-col>
</template>
<script>
import {
  quillRedefine,
} from 'vue-quill-editor-upload';
import {
  quillEditor,
} from 'vue-quill-editor';
import api from '@/api';
import getDate from '@/date';

export default {
  components: {
    quillEditor, // 声明组件
  },
  data() {
    return {
      formData: {
        id: getDate.getTimeStamp(),
        status: `${this.$route.params.st}`,
        title: '', // 文章标题
        time: '',
        author: '',
        wc_head_img: '',
        original: 1,
        content: '',
        publish: 0,
      },
      is_editorId: true, // 编辑进来
      is_draft: true, // 是否显示  存草稿
      rules: {
        title: [{
          required: true,
          message: '请输入文章标题',
          trigger: 'blur',
        }],
        author: [{
          required: true,
          message: '请输入文章作者',
          trigger: 'blur',
        }],
        loadimg: [{
          required: true,
          message: '请上传缩略图',
          trigger: 'blur',
        }],
      },
      content: '', // 编辑器内容
      editorOption: {
        // 编辑器的配置
        // something config
      },
    };
  },
  computed: {
    // 路由参数
    type() {
      return this.$route.params.type;
    },
    // 将路由参数映射为后端请求参数 status
    statusMap() {
      return {
        news: 0,
        sun: 1,
        bashi: 2,
        zhaop: 3,
        fei: 4,
        video: 5,
      };
    },
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    },

  },
  mounted() {
    console.log(this.$route);

    const id = this.$route.params.id;
    const st = this.$route.params.st;
    if (id == '') { // 添加文章
      // 判断是否存在id 显示存草稿
      console.log(st, id);
      this.is_draft = true;
      this.is_editorId = false;
    } else {
      this.is_editorId = true;
      this.is_draft = false;
      api.getEditorItem(st, id).then((res) => {
        console.log('编辑当前');
        console.log(res);
        this.formData.title = res.data[0].title;
        this.formData.time = res.data[0].time;
        this.formData.author = res.data[0].author;
        this.formData.original = res.data[0].original;
        this.formData.content = res.data[0].content;
        this.formData.transfer_from = res.data[0].transfer_from;
      });
    }
  },
  methods: {
    changeLoad(file, fileList) {
      this.formData.wc_head_img = file.url;
    },
    handleAvatarSuccess(res, file) {
      this.wc_head_img = res.data;
      console.log('upload====');
      console.log(res);
      this.saveData(this.$route.params.id, this.curType);

      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    onEditorChange({
      editor,
      html,
      text,
    }) {
      this.formData.content = html;
      // if(this.uploadType === 'image'){
      //   console.log(this)
      // } else if (this.uploadType === 'video'){

      // }
    },
    isSubmit(type) {
      this.curType = type;
      if (this.$refs.uploader) {
        this.$refs.uploader.submit();
      }
    },
    saveData(id, type) {
      this.formData.publish = type;
      this.formData.time = getDate.fmtDate(this.formData.time);
      const params = this.formData;
      console.log(params);
      if (this.is_editorId) {
        // 编辑进来
        api.updataList({
          params,
          id,
        }).then((res) => {
          console.log('更新成功');
          console.log(res);
          if (res.status == 200) {
            this.$message.success(type == 0 ? '保存草稿！' : '发布成功');
            this.$router.go(-1);
          }
        });
      } else {
        console.log('添加文章=====');
        console.log(params);
        api.addList(params).then((res) => {
          console.log('保存草稿');
          console.log(res);
          if (res.status == 200) {
            this.$message.success(type == 0 ? '保存草稿！' : '发布成功');
            this.$router.go(-1);
          }
        });
      }
    },
  },
};

</script>
<style>
  .submit-btncont {
    padding-top: 20px;
  }

  .el-form-item__label {
    text-align: center;
  }

  .avatar-uploader .el-upload {
    width: 120px;
    height: 120px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader {
    width: 120px;
    height: 120px;
  }

  .avatar-uploader-icon {
    font-size: 14px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }

</style>
