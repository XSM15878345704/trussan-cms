<template>
     <el-col :span="12" :offset="4">
            <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                <el-form-item label="招聘职位" prop="recruit_name">
                    <el-input v-model="formData.recruit_name"></el-input>
                </el-form-item>
                <el-form-item label="岗位类别" prop="recruit_type">
                     <el-select v-model="formData.recruit_type" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label="岗位职责" prop="recruit_duty">
                    <el-input type="textarea" v-model="formData.recruit_duty"></el-input>
                </el-form-item>
                <el-form-item label="岗位要求" prop="recruit_require">
                <el-input type="textarea" v-model="formData.recruit_require"></el-input>
            </el-form-item>
            <el-form-item class="submit-btncont">
              <el-button class="editor-btn" type="primary" @click="isSubmit">发布</el-button>
        <el-button class="editor-btn" type="primary" @click="draftFn" v-if="is_drft">存草稿</el-button>
            </el-form-item>
            </el-form>
        </el-col>
</template>
<script>
import api from '@/api';
import getDate from '@/date';

export default {
  data() {
    return {
      formData: {
        id: getDate.getTimeStamp(),
        status: '3',
        recruit_name: '', // 文章标题
        recruit_type: 0,
        recruit_duty: '',
        recruit_require: '',
        publish: 0,
      },
      is_editorId: false, // 编辑进来
      is_drft: true, // 是否显示  存草稿
      rules: {
        recruit_name: [
          { type: 'date', message: '请输入招聘职位', trigger: 'blur' },
        ],
        recruit_duty: [
          { type: 'date', required: true, message: '请输入岗位职责', trigger: 'blur' },
        ],
        recruit_require: [
          { type: 'date', required: true, message: '请输入岗位要求', trigger: 'blur' },
        ],
      },
      options: [
        { value: 0, label: '理财规划师' },
        { value: 1, label: '市场类' },
        { value: 2, label: '产品类' },
        { value: 3, label: '后期类' },
        { value: 4, label: '技术类' },
        { value: 5, label: '文案编辑类' },
        { value: 6, label: '视频制作类' },
      ],
      content: '',
      editorOption: {
        // something config
      },
    };
  },
  components: {

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
  },
  methods: {
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

