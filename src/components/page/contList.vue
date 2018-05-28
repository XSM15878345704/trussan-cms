<template>

    <div class="table">
        <div class="handle-box">
            <el-button type="primary" class="handle-del mr10" @click="doAll" v-if="is_del">批量操作</el-button>
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll" v-if="is_nodel">批量删除</el-button>
            <el-button type="primary" class="handle-del mr10" @click="cancleAll" v-if="is_nodel">取消</el-button>
             <el-button type="primary" icon="plus" class="handle-del mr10 addbtn" @click="addAll">添加文章</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" v-if="is_nodel"></el-table-column>
            <el-table-column prop="create_time" label="日期" sortable width="150">
            </el-table-column>
            <el-table-column prop="author" label="作者" width="120">
            </el-table-column>
            <el-table-column prop="content" label="文章内容" :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">

                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
    </div>

</template>

<script>

import api from '@/api';


export default {
  data() {
    return {
      url: './static/vuetable.json',
      tableData: [{}],
      cur_page: 1,
      multipleSelection: [],
      select_cate: '',
      select_word: '',
      del_list: [],
      is_del: true,
      is_nodel: false,
      thisPath: this.$route.params.type,
    };
  },
  created() {
    this.getList(this.statusMap[this.type || 0]);
  },
  watch: {
    '$route.path': function () {
      this.thisPath = this.$route.path;
      this.getList(this.statusMap[this.type || 0]);
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
  },
  methods: {
    getList(status) {
      api.getList(status)
        .then((res) => {
          this.tableData = res.data;
          console.log(res.data);
        });
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      // this.getData();
    },
    getData() {
      const self = this;
      if (process.env.NODE_ENV === 'development') {
        self.url = '/ms/table/list';
      }
    },
    search() {
      this.is_search = true;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(index, row) {
      console.log('===');
      console.log(this.$route.params.type);
      switch (this.$route.params.type) {
        case 'sun':
          this.$router.push({ name: 'wcEditor', params: { index } });
          break;

        case 'bashi':
          this.$router.push({ name: 'wcEditor', params: { index } });
          break;

        case 'fei':
          this.$router.push({ name: 'feiEd', params: { index } });
          break;

        case 'zhaop':
          this.$router.push({ name: 'jobEd', params: { index } });
          break;

        case 'news':
          this.$router.push({ name: 'newsEditor', params: { index } });
          break;

        default:
          break;
      }

      // this.$message('编辑第'+(index+1)+'行');
    },
    handleDelete(index, row) {
      this.$message.error(`删除第${index + 1}行`);
    },
    doAll() {
      const self = this;
      self.is_nodel = true;
      self.is_del = false;
    },
    cancleAll() {
      const self = this;
      self.is_nodel = false;
      self.is_del = true;
    },
    delAll() {
      const length = this.multipleSelection.length;
      let str = '';
      this.del_list = this.del_list.concat(this.multipleSelection);

      for (let i = 0; i < length; i++) {
        str += `${this.multipleSelection[i].name} `;
      }
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要删除的数据',
          type: 'warning',
        });
      }
      console.log(str);
      this.$message.error(`删除了${str}`);
    },
    addAll() {
      const self = this;
      // self.$router.push('/newseditor');
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.addbtn {
  float: right;
}
</style>
