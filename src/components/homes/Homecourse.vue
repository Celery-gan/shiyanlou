<template>
  <div>
    <!-- 第二栏 顶部 白色背景 居中 -->
    <div class="home-top bg-white">
      <!-- 第二栏 顶部 左边 -->
      <div class="menu-list">
        <!-- 第一项有小图标 占位为2 -->
        <div class="menu-list-item1 el-icon-s-grid">全部课程</div>
        <!-- 普通div 占位为1  -->
        <div class="menu-list-item">路径</div>
        <div class="menu-list-item">训练营</div>
        <div class="menu-list-item">楼+</div>
        <div class="menu-list-item">会员</div>
        <!-- 下拉菜单 hover触发  -->
        <el-row class="menu-list-item">
          <el-col>
            <el-dropdown @command="handleCommand">
              <span class="menu-list-item">
                社区
                <!-- el-icon-caret-bottom 图表样式 -->
                <i class="el-icon-caret-bottom"></i>
              </span>
              <!-- 下拉列表 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in community"
                  :key="item.id"
                  :command="item.command"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
      <!-- 第二栏 顶部 右边 -->
      <div class="menu-list-right">
        <!-- 搜索框 -->
        <el-input v-model="inputs" placeholder="请输入搜索内容" class="seraches"></el-input>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="main-bg">
      <div class="carousel">
        <div class="carousel-pic">
          <el-carousel indicator-position="inside" height="530px">
            <el-carousel-item v-for="item in picture" :key="item.id">
              <img :src="item.picture_url" class="carousel-img" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 课程列表 -->
        <div class="menu-lists">
          <div v-for="(item,index) in category" :key="item.id" class="item-color">
            <!-- 显示列表 每行显示3个值 类别和类别对应里面刚开始的两个名字 -->
            <div class="item-checks">
              <!-- 课程名称 -->
              <span class="item-sizes">{{item.name}}</span>
              <!-- 类别里面第一个课程 -->
              <span class="item-sizes">{{item.tags[0].name}}</span>
              <!-- 类别里面第二个课程 -->
              <span class="item-sizes">{{item.tags[1].name}}</span>
            </div>
            <!-- 鼠标移动到每项之后显示的内容 -->
            <div :class="[ index < 4 ? 'item-info' : 'item-info1']">
              <!-- 标题 -->
              <el-tag type="success">{{item.name}}</el-tag>
              <!-- 类别里面全部课程展示  -->
              <div class="hover-info1">
                <div v-for="item1 in item.tags" :key="item1.id" class="hover-info">
                  <span>{{item1.name}}</span>
                  <span>|</span>
                </div>
              </div>
              <!-- 推荐课程 -->
              <el-tag type="success">推荐课程</el-tag>
              <!-- 推荐课程介绍 -->
              <div class="hover-info1">
                <div v-for="item1 in item.recommend_courses" :key="item1.id" class="hover-info">
                  <span>{{item1.name}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 课程列表之后一个位置信息 -->
          <div class="box-although">
            <div class="although-zone">经管专区</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 输入框绑定内容
      inputs: "",
      // 社区列表
      community: [
        { command: "a", name: "蚂蚁上树" },
        { command: "b", name: "红烧狮子头" },
        { command: "c", name: "麻婆豆腐" },
        { command: "d", name: "水煮肉片" },
        { command: "e", name: "银耳炖燕窝" }
      ],
      // 是否水平折叠收起菜单
      isCollapse: true,
      // 存储课程列表
      category: [],
      // 存储轮播图的图片
      picture: []
    };
  },
  components: {},
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    // 获取课程信息
    getcate() {
      this.$axios
        .req("/categories/")
        .then(res => {
          this.category = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取轮播图的图片
    getpicture() {
      this.$axios
        .req("/banner-pictures/")
        .then(res => {
          this.picture = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getcate();
    this.getpicture();
  },

  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// 内容居中对齐
.home-top {
  width: 70vw;
  margin: 0 auto;
  display: flex;
}
// 菜单 背景色
.bg-white {
  background: rgb(255, 255, 255);
  height: 50px;
  line-height: 50px;
}
// 菜单 列表信息占位
.menu-list {
  flex: 4;
  display: flex;
}
// 菜单 列表第一项
.menu-list-item1 {
  // flex: 2;
  width: 248px;
  background: rgb(47, 192, 11);
  line-height: 50px;
  padding-left: 10px;
  color: white;
}
// 菜单 列表每项
.menu-list-item {
  flex: 1;
  text-align: center;
  font-size: 16px;
}
.menu-list-item:hover {
  color: rgb(47, 192, 11);
}
// 菜单 搜索框占位
.menu-list-right {
  flex: 3;
}
// 菜单 搜索框
.seraches {
  width: 50%;
  margin: 0 10px;
  float: right;
}
// 轮播图 这个背景
.main-bg {
  width: 100%;
  background: rgb(102, 153, 36);
}
// 轮播图占位
.carousel {
  width: 70vw;
  margin: 0 auto;
  position: relative;
  height: 513px;
}
// 轮播图
.carousel-pic {
  position: absolute;
  left: 0;
  width: 100%;
  margin: 0 auto;
}
.carousel-img {
  width: 100%;
}
// 轮播图->课程列表 （更高层级显示）
.menu-lists {
  line-height: 55px;
  height: 513px;
  width: 258px;
  position: absolute;
  left: 0;
  z-index: 2;
  color: #fff;
  background: rgba(223, 223, 223, 0.5);
}
//  课程列表 每项
.item-color {
  position: relative;
}
//  课程列表 某项鼠标移动到上面
.item-color:hover {
  background: rgb(255, 255, 255);
  color: #333;
  // 列表某项 鼠标移动到上面时 显示item-info的信息
  .item-info {
    display: block;
  }
  .item-info1 {
    display: block;
  }
}
// 菜单列表 每一行里面的格式
.item-checks {
  margin: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  border-bottom: 1px solid rgb(207, 207, 207);
}
// 菜单列表 每一行里面的每一个数据
.item-sizes {
  margin: 0 5px;
}
// 列表每项隐藏的详细信息盒子格式
.item-info {
  display: none;
  width: 280px;
  background: #fff;
  color: rgb(192, 192, 192);
  box-shadow: 1px 1px 1px 1px rgb(228, 228, 228);
  position: absolute;
  padding: 10px;
  left: 258px;
  top: 0;
}
// 列表每项隐藏的详细信息盒子格式2
.item-info1 {
  display: none;
  width: 280px;
  background: #fff;
  color: rgb(192, 192, 192);
  box-shadow: 1px 1px 1px 1px rgb(228, 228, 228);
  position: absolute;
  top: -220px;
  padding: 10px;
  left: 258px;
}
// 隐藏的详细信息里面的信息的盒子格式
.hover-info1 {
  width: 245px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
// 隐藏的详细信息里面的信息格式
.hover-info {
  padding: 0 5px;
  font-size: 14px;
  line-height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

//  经管专区格式
.although-zone {
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  width: 80px;
  margin: 10px auto;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 20px;
}
//  经管专区鼠标悬浮样式
.although-zone:hover {
  background: rgb(255, 255, 255);
  color: #333;
}
</style>