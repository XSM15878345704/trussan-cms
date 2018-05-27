<template>
     <el-col :span="12" :offset="4">
            <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                <el-form-item label="招聘职位" prop="typeName">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="岗位类别" prop="type">
                     <el-cascader
                      :options="options"
                      :show-all-levels="false"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="岗位职责" prop="duty">
                    <el-input type="textarea" ></el-input>
                </el-form-item>
                <el-form-item label="岗位要求" prop="reqs">
                <el-input type="textarea" ></el-input>
            </el-form-item>
            <el-form-item class="submit-btncont">
              <el-button class="editor-btn" type="primary">发布</el-button>
            <el-button class="editor-btn" type="primary" >存草稿</el-button>
            </el-form-item>
            </el-form>
        </el-col>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      radio: "1",
      imageUrl: "",
      formData: {
        typeName: "", //店铺名称
        type: "",
        duty: "",
        reqs: ""
      },
      rules: {
          typeName: [
            { type: 'date', message: '请输入招聘职位', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择岗位类别', trigger: 'change' }
          ],
          duty: [
            { type: 'date', required: true, message: '请输入岗位职责', trigger: 'blur' }
          ],
          reqs: [
            { type: 'date', required: true, message: '请输入岗位要求', trigger: 'blur' }
          ]
        },
      options: [{
        value: 'licai',
        label: '理财规划师',
        children: [{
          value: 'one',
          label: "理财师"
        }]
      },{
        value: 'licai',
        label: '理财规划师',
        children: [{
          value: 'one',
          label: "理财师"
        }]
      },{
        value: 'licai',
        label: '理财规划师',
        children: [{
          value: 'one',
          label: "理财师"
        }]
      }],
      content: "",
      editorOption: {
        // something config
      }
    };
  },
  components: {
    quillEditor
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    submit() {
      console.log(this.content);
      this.$message.success("提交成功！");
    }
  }
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

