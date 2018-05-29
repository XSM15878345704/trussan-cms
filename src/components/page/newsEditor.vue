<template>
     <el-col :span="12" :offset="4">
            <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label="发布时间" prop="time">
                    <el-date-picker
                      v-model="formData.time"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="文章作者" prop="author">
                    <el-input v-model="formData.author"></el-input>
                </el-form-item>
                 <el-form-item label="文章转自" prop="transfer_from">
                    <el-input v-model="formData.transfer_from"></el-input>
                </el-form-item>
              <quill-editor ref="myTextEditor"
                  v-model="formData.content"
                  :config="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
            </quill-editor>

        <el-button class="editor-btn" type="primary" @click="isSubmit">发布</el-button>
        <el-button class="editor-btn" type="primary" @click="draftFn" v-if="is_drft">存草稿</el-button>
            </el-form>
        </el-col>
</template>
<script>
import { quillRedefine } from 'vue-quill-editor-upload';
import { quillEditor } from 'vue-quill-editor';
import api from '@/api';
import getDate from '@/date';

export default {
  data() {
    return {
      formData: {
        id: getDate.getTimeStamp(),
        status: '0',
        title: '', // 文章标题
        time: '',
        author: '',
        transfer_from: '',
        content: '',
        publish: 0,
      },
      is_editorId: false, // 编辑进来
      is_drft: true, // 是否显示  存草稿
      uploadType: '', // 上传图片类型
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],

        author: [
          { required: true, message: '请输入发表作者', trigger: 'blur' },
        ],
        transfer_from: [
          { required: true, message: '请输入文章转自', trigger: 'blur' },
        ],
      },
      content: '',
      editorOption: {
        // something config
      },
    };
  },
  components: {
    quillEditor,
    quillRedefine, // 注册组件
  },
  watch: {
    '$route.path': function () {
      this.status = this.statusMap[this.type || 0];
    },
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
    if (id == undefined) { // 判断是否存在id 显示存草稿
      console.log(st, id);
      this.is_drft = true;
    } else {
      this.is_drft = false;
      this.is_editorId = true;
    }

    api.getEditorItem(st, id)
      .then((res) => {
        console.log('编辑当前');
        console.log(res);
        this.formData.title = res.data[0].title;
        this.formData.time = res.data[0].time;
        this.formData.author = res.data[0].author;
        this.formData.content = res.data[0].content;
        this.formData.transfer_from = res.data[0].transfer_from;
      });

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
        this.$message.error('上传头像图片只能是 JPG或者png格式!');
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
    isSubmit() { // 发布
      this.saveData(params, this.$route.params.id, 1);
    },
    draftFn() { // 保存草稿
      this.saveData(params, this.$route.params.id, 0);
    },
    saveData(ps, id, type) {
      this.formData.publish = type;
      this.formData.time = getDate.fmtDate(this.formData.time);
      const params = this.formData;
      console.log(params);
      if (this.is_editorId) { // 编辑进来
        api.updataList({ params: ps, id })
          .then((res) => {
            console.log('更新成功');
            console.log(res);
            if (res.status == 200) {
              this.$message.success(type == 0 ? '保存草稿！' : '发布成功');
              this.$router.go(-1);
            }
          });
      } else {
        api.addList(ps)
          .then((res) => {
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
