<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes"  class="el-menu-vertical-demo" @select="itemsFn" theme="dark" unique-opened router>
            <template v-for="(item,index) in items" >
                <template v-if="item.subs" >
                    <el-submenu :index="item.path" @click.native="subItemFn(index)">
                        <template slot="title" ><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.path">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.path">
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
      items: [
        {
          icon: 'el-icon-setting',
          path: '/news',
          cont: 'news',
          index: '0',
          title: '新闻资讯',
        },
        {
          icon: 'el-icon-menu',
          path: 'conlist',
          index: '1',
          title: '微信文章',
          subs: [
            {
              path: 'sun',
              cont: '/sun',
              index: '0',
              title: '孙明展',
            },
            {
              path: '/bashi',
              cont: 'bashi',
              index: '1',
              title: '理财巴士',
            },
          ],
        },
        {
          icon: 'el-icon-date',
          path: '/zhaop',
          cont: 'zhaop',
          index: '2',
          title: '人力招聘',
        },
        {
          icon: 'el-icon-star-on',
          path: '/fei',
          cont: 'fei',
          index: '3',
          title: '飞慕课课程推荐',
        },
        {
          icon: 'el-icon-upload2',
          path: '/video',
          cont: 'video',
          index: '4',
          title: '官网视频',
        },
      ],
    };
  },
  computed: {
    onRoutes() {
      console.log(111);
      console.log(this.$route);


      return this.$route.fullPath.replace('/home/', '');
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
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
