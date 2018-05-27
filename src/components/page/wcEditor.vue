<template>
     <el-col :span="12" :offset="4">
            <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label="发布时间" prop="time">
                    <el-input v-model="formData.time"></el-input>
                </el-form-item>
                <el-form-item label="文章作者" prop="acthor">
                    <el-input v-model="formData.acthor"></el-input>
                </el-form-item>
                <el-form-item label="上传缩略图" prop="loadimg">
                <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-change="changeLoad">
                    <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar" v-model="formData.imageUrl">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
              <el-form-item label="原创" prop="original">
                    <el-radio v-model="formData.radio" label="1">是</el-radio>
                    <el-radio v-model="formData.radio" label="2">否</el-radio>
                    <i>(勾选”是“，文章会打上原创标签)</i>
                </el-form-item>
        <quill-editor
          ref="myTextEditor"
          v-model="content"
          :options="editorOption"
          @change="onEditorChange($event)"
         ></quill-editor>
       <el-form-item class="submit-btncont">
              <el-button class="editor-btn" type="primary" @click.native="submitFn">发布</el-button>
            <el-button class="editor-btn" type="primary" @click.native="noSubmitFn">存草稿</el-button>
            </el-form-item>
            </el-form>
        </el-col>
</template>
<script>
import { quillEditor } from 'vue-quill-editor';

export default {
  components: {
    quillEditor, // 声明组件
  },
  data() {
    return {
      formData: {
        name: '', // 文章标题
        time: '',
        acthor: '',
        loadimg: '',
        radio: '1',
        content: '',
        imageUrl: '',
      },
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        time: [{ required: true, message: '请输入发布时间', trigger: 'blur' }],
        acthor: [{ required: true, message: '请输入文章作者', trigger: 'blur' }],
        loadimg: [{ required: true, message: '请上传缩略图', trigger: 'blur' }],
      },
      content: '', // 编辑器内容
      editorOption: { // 编辑器的配置
        // something config
      },
    };
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    },
  },
  mounted() {

  },
  methods: {
    changeLoad(file, fileList) {
      const self = this;
      const param = new FormData();
      param.append('file', file, file.name);
      console.log(param);
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      axios.post('', param, config)
        .then((response) => {
          if (response.data.code === 0) {
            self.formData.ImgUrl = response.data.data;
          }
          console.log(response.data);
        });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {

      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
      const fileData = new FormData();
      fileData.append('img', file);
      console.log(fileData);
    },
    onEditorChange({ editor, html, text }) {
      this.formData.content = html;
      console.log(html);
      // if(this.uploadType === 'image'){
      //   console.log(this)
      // } else if (this.uploadType === 'video'){

      // }
    },
    submitFn() {
      console.log('====');
      console.log(this.formData);
      this.$message.success('提交成功！');
    },
  },
};
</script>
<style>
.submit-btncont{
  padding-top: 20px;
}
.el-form-item__label{
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
  .avatar-uploader{
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

