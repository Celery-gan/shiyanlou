<template>
  <div>
    <div class="homes">
      <div v-if="headerFixed" id="fixedHeaderRoot">
        <div id="knowPointHeader" class="home-top1" :class="headerFixed?'isFixed':''">
          <div class="home-top">
            <div class="home-topleft1">
              <img src="https://static.shiyanlou.com/frontend/dist/img/9f43b00.svg" class="logo" />
              <div class="top-lists">
                <div class="menu-list-item">课程</div>
                <div class="menu-list-item">路径</div>
                <div class="menu-list-item">训练营</div>
                <div class="menu-list-item">楼+</div>
                <div class="menu-list-item">会员</div>
              </div>
            </div>
            <div class="home-topright1">
              <div>
                <el-input v-model="inputs" placeholder="请输入" class='home-topinputs'></el-input>
              </div>
              <div>
                <el-button type="success" size="medium" @click="goto('/login')">登录</el-button>
                <el-button type="success" size="medium" @click="goto('/register')">注册</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="home-top">
        <div class="home-topleft">
          <img src="https://static.shiyanlou.com/frontend/dist/img/9f43b00.svg" class="logo" />
          <div>做实验，学编程</div>
        </div>
        <div class="home-topright">
          <div class="release">
            <span class="hovers">企业版</span>|
            <span class="hovers">学校版</span>
          </div>
          <div @click="goto('/login')" class="loginin">登录</div>
          <div>
            <el-button type="success" size="medium" @click="goto('/register')">注册</el-button>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- 课程分类.轮播图 -->
      <homecour></homecour>
      <!-- 楼+实战课程 -->
      <courses></courses>
      <bootcamp></bootcamp>
      <div></div>
    </div>
  </div>
</template>

<script>
import homecour from "../components/homes/Homecourse";
import courses from "../components/homes/CourseSection";
import bootcamp from "../components/homes/Barracks";
import { watch } from "fs";
export default {
  name: "home",
  components: {
    homecour,
    courses,
    bootcamp
  },
  data() {
    return {
      offsetTop: "",
      offsetHeight: "",
      headerFixed: ""
    };
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    handleScroll() {
      // 得到页面滚动的距离
      let scrollTop1 =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 判断页面滚动的距离是否大于吸顶元素的位置
      this.headerFixed = scrollTop1 > this.offsetTop - this.offsetHeight * 2;
    }
  },
  mounted() {
    // handleScroll为页面滚动的监听回调
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {}
};
</script>

<style scoped lang='scss'>
.isFixed {
  position: fixed;
  width: 100%;
  display: flex;
  background: rgb(255, 255, 255);
  box-shadow: 0 0 10px 0 rgb(206, 201, 201);
  line-height: 70px;
  z-index: 5;
}
.homes {
  background: rgb(247, 247, 247);
  line-height: 30px;
}
.home-top1 {
  width: 100%;
  height: 60px;
}
.home-top {
  width: 70vw;
  margin: 0 auto;
  display: flex;
}
.home-topleft {
  flex: 5;
  display: flex;
  line-height: 50px;
}
.home-topright {
  flex: 2;
  display: flex;
  justify-content: space-evenly;
  line-height: 50px;
}
.logo {
  margin-left: 10px;
  width: 120px;
  height: 50px;
}
.release {
  color: grey;
  font-size: 14px;
}
.loginin {
  color: rgb(19, 173, 52);
  font-size: 16px;
}
.hovers:hover,
.loginin:hover {
  color: rgb(11, 101, 236);
}
.top-lists {
  width: 20vw;
  display: flex;
}
.menu-list-item {
  flex: 1;
  text-align: center;
  font-size: 16px;
}

.home-topleft1 {
  flex: 1;
  display: flex;
  line-height: 50px;
}
.home-topright1 {
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  line-height: 50px;
}
.home-topinputs {
  width: 20vw;
}
</style>