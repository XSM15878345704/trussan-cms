<template>
    <div class="header">
        <div class="logo">创必承</div>

        <div class="user-info">
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: this.$route.path }">{{name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      name: '新闻资讯',
    };
  },
  watch: {
    $route() {
      switch (this.$route.params.type) {
        case 'news':
          this.name = '新闻资讯';
          break;

        case 'sun':
          this.name = '微信文章-孙明展';
          break;

        case 'bashi':
          this.name = '微信文章-理财巴士';
          break;

        case 'zhaop':
          this.name = '人力招聘';
          break;

        case 'fei':
          this.name = '飞慕课推荐';
          break;

        case 'video':
          this.name = '官网视频';
          break;
      }
    },
  },
  computed: {
    username() {
      const username = localStorage.getItem('ms_username');
      return username || this.name;
    },
  },
  methods: {
    handleCommand(command) {
      if (command == 'loginout') {
        localStorage.removeItem('ms_username');
        this.$router.push('/login');
      }
    },
  },
};
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        padding-right: 50px;
        padding-left: 50px;
        font-size: 16px;
        color: #fff;
    }
    .el-breadcrumb{
        float: left;
        line-height: 70px;
        padding-left: 50px;
        font-size: 18px;
    }
    .el-breadcrumb__item__inner{
        color: #fff;
    }
    .el-dropdown{
        float: right;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
