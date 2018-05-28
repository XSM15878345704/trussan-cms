<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" @select="itemsFn" theme="dark" unique-opened router>
      <template v-for="(item,index) in items">
        <template v-if="item.subs">
          <el-submenu :key="item.path" :index="index+''" @click.native="subItemFn(index)">
            <template slot="title">
              <i :class="item.icon"></i>{{ item.title }}</template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.path">{{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :key="item.path" :index="item.path">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{
        icon: 'el-icon-setting',
        path: '/news',
        title: '新闻资讯',
      },
      {
        icon: 'el-icon-menu',
        path: 'conlist',
        title: '微信文章',
        subs: [{
          path: '/sun',
          title: '孙明展',
        },
        {
          path: '/bashi',
          title: '理财巴士',
        },
        ],
      },
      {
        icon: 'el-icon-date',
        path: '/zhaop',
        title: '人力招聘',
      },
      {
        icon: 'el-icon-star-on',
        path: '/fei',
        title: '飞慕课课程推荐',
      },
      {
        icon: 'el-icon-upload2',
        path: '/video',
        title: '官网视频',
      },
      ],
    };
  },
  computed: {
    onRoutes() {
      console.log('高亮选中菜单', this.$route);
      return `/${this.$route.params.type}`;
    },

  },
  methods: {
    itemsFn(i) {
      console.log('select', i);
    },
    subItemFn(idx) {
      console.log('click', idx);
    },
  },
};

</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    width: 250px;
    left: 0;
    top: 70px;
    bottom: 0;
    background: #2E363F;
  }

  .sidebar>ul {
    height: 100%;
  }

</style>
