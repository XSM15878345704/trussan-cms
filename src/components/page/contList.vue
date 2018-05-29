<template>

    <div class="table">
        <div class="handle-box">
            <el-button type="primary" class="handle-del mr10" @click="doAll" v-if="is_del">批量操作</el-button>
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll" v-if="is_nodel">批量删除</el-button>
            <el-button type="primary" class="handle-del mr10" @click="cancleAll" v-if="is_nodel">取消</el-button>
             <el-button type="primary" icon="plus" class="handle-del mr10 addbtn" @click="addAll">添加文章</el-button>
        </div>
        <el-table :data="tableData2" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" v-if="is_nodel"></el-table-column>
             <el-table-column prop="time" :formatter="getTime" label="时间" sortable >

            </el-table-column>
            <el-table-column prop="title" label="标题" >
            </el-table-column>
            <el-table-column prop="author" label="作者" width="120">
            </el-table-column>
            <el-table-column label="发布状态" width="120">
              <template slot-scope="scope">
                {{ scope.row.publish == 1 ? '发布' : '存草稿' }}
            </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">

                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row,scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    :page-size="10"
                    layout="total, prev, pager, next"
                    :total="cTotal">
            </el-pagination>
        </div>
    </div>

</template>

<script>

import api from '@/api';
import getDate from '@/date';

export default {
  data() {
    return {
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: '',
      select_word: '',
      del_list: [],
      is_del: true,
      is_nodel: false,
      tableData2: [],
      thisPath: this.$route.params.type,
      cTotal: 0,
    };
  },
  created() {
    this.getList(this.statusMap[this.type || 0]);
    // const self = this;
    // const selectUrl = '/select';
    // self.$axios.get(self.url).then((res) => {
    //   self.tableData2 = res.data.list;
    //   self.$axios.get(selectUrl).then((res) => {
    //     console.log(res);
    //   });
    // });
  },
  watch: {
    '$route.path': function () {
      this.thisPath = this.$route.path;
      this.getList(this.statusMap[this.type || 0]);
      console.log(this.statusMap[this.type || 0]);
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
    getTime(row, column) {
      const res = getDate.fmtDate(row.time);
      return res;
    },
    getList(status) {
      api.getList(status)
        .then((res) => {
          this.tableData2 = res.data;
          console.log(res.data);
        });
      api.getpage(status)
        .then((res) => {
          console.log('获取条目');
          this.cTotal = res.data[0].NumberOfOrders;
        });
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getPageData(this.statusMap[this.type || 0], val);
    },
    getPageData(st, vl) {
      console.log(st, vl);

      api.getPageList(st, vl)
        .then((res) => {
          console.log('翻页===');
          console.log(res);
          this.tableData2 = res.data;
        });
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(index, scope) {
      console.log('=====scope');
      console.log(scope);
      const id = scope.row.id || '';
      const st = this.statusMap[this.type || 0];

      switch (this.$route.params.type) {
        case 'sun':
          this.$router.push({ name: 'wcEditor', params: { id, st } });
          break;

        case 'bashi':
          this.$router.push({ name: 'wcEditor', params: { id, st } });
          break;

        case 'fei':
          this.$router.push({ name: 'feiEd', params: { id, st } });
          break;

        case 'zhaop':
          this.$router.push({ name: 'jobEd', params: { id, st } });
          break;

        case 'news':
          this.$router.push({ name: 'newsEditor', params: { id, st } });
          break;

        default:
          break;
      }

      // this.$message('编辑第'+(index+1)+'行');
    },
    handleDelete(index, row, scope) {
      this.$message.error(`删除第${index + 1}行`);
      console.log(scope.row);
      api.delList(scope.row.id, scope.row.status).then((res) => {
        console.log('删除第${index + 1}行');
        console.log(res);
        this.getList(this.statusMap[this.type || 0]);
      });
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
      const self = this,
        length = self.multipleSelection.length;
      let str = '';
      self.del_list = self.del_list.concat(self.multipleSelection);

      for (let i = 0; i < length; i++) {
        str += `${self.multipleSelection[i].id}, `;
      }
      if (self.multipleSelection.length == 0) {
        self.$message({
          message: '请选择要删除的数据',
          type: 'warning',
        });
        return;
      }

      api.delAll(this.statusMap[this.type || 0], str)
        .then((res) => {
          console.log(res);
          this.getList(this.statusMap[this.type || 0]);
        });
      console.log(str);
      self.$message.error(`删除了${str}`);
    },
    addAll() {
      const id = '';
      const st = this.statusMap[this.type || 0];
      switch (this.$route.params.type) {
        case 'sun':
          this.$router.push({ name: 'wcEditor', params: { id, st } });
          break;

        case 'bashi':
          this.$router.push({ name: 'wcEditor', params: { id, st } });
          break;

        case 'fei':
          this.$router.push({ name: 'feiEd', params: { id, st } });
          break;

        case 'zhaop':
          this.$router.push({ name: 'jobEd', params: { id, st } });
          break;

        case 'news':
          this.$router.push({ name: 'newsEditor', params: { id, st } });
          break;

        default:
          break;
      }
    },
    handleSelectionChange(val) {
      console.log(this.type);


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
