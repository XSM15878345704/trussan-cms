<template>
     <el-col :span="12" :offset="4">
            <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                <el-form-item label="文章标题" prop="name">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="发布时间" prop="time">
                    <el-date-picker
                      v-model="formData.time"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="文章转自" prop="author">
                    <el-input v-model="formData.author"></el-input>
                    <p>文章出处</p>
                </el-form-item>
              <quill-editor ref="myTextEditor"
                  v-model="formData.content"
                  :config="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
            </quill-editor>
        <el-button class="editor-btn" type="primary" @click="isSubmit">发布</el-button>
        <el-button class="editor-btn" type="primary" @click="draftFn">存草稿</el-button>
            </el-form>
        </el-col>
</template>
<script>
import { quillRedefine } from 'vue-quill-editor-upload';
import { quillEditor } from 'vue-quill-editor';

export default {
  data() {
    return {
      radio: '1',
      imageUrl: '',
      formData: {
        status: 1,
        name: '', // 文章标题
        time: '',
        author: '',
        headImg: '',
        radio: '1',
        content: '',
      },
      uploadType: '',
      rules: {
        name: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],

        author: [
          { required: true, message: '请输入发表作者', trigger: 'blur' },
        ],
      },
      content: '',
      editorOption: {
        // something config
      },
    };
  },
  components: {
    quillEditor, quillRedefine, // 注册组件
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    },
  },
  mounted() {
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性
    this.$refs.myTextEditor.quill
      .getModule('toolbar')
      .addHandler('image', this.imgHandler);
    this.$refs.myTextEditor.quill
      .getModule('toolbar')
      .addHandler('video', this.videoHandler); // 为视频ICON绑定事件
  },
  methods: {
    // 点击图片ICON触发事件
    imgHandler(state) {
      console.log('图片');
      console.log(state);

      this.uploadType = 'image';
    },
    // 点击视频ICON触发事件
    videoHandler(state) {
      console.log('视频');
      this.addRange = this.$refs.myTextEditor.quill.getSelection();

      this.uploadType = 'video';
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
    // 富文本编辑器
    onEditorBlur(editor) {
      console.log('editor blur!', editor);
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor);
      console.log(this);
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor);
      console.log('============');
      console.log(this);
    },
    isSubmit() {
      const params = this.formData;
      console.log(params.author);
      let addUrl = '/addData';
      this.$axios.post(addUrl, params).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
      this.$message.success('提交成功！');
    },
    draftFn() {
      const postData = this.formData;
      console.log(postData);
      this.$message.success('提交成功！');
    },
  },
};
</script>
<style>
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

