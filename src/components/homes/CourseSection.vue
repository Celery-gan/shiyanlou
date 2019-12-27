<template>
  <div>
    <!-- 楼+实战课程 -->
    <div class="Practice-course">
      <!-- 第一个标题 -->
      <div class="course-tltle flexbtw">
        <div>
          <!-- 大标题昨天天天加粗 -->
          <span class="course-tltle-strong">楼+实战课程 |</span>
          定期开班，导师助教全程辅导，最快最优成长
        </div>
        <div>
          更多
          <!-- > 向右箭头样式 -->
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="flexbtw">
        <!-- louplus 存储楼+数据的数组 -->
        <div v-for="item in louplus" :key="item.id" class="louplus-card">
          <!-- 图片 置顶 -->
          <img :src="item.picture_url" class="louplus-img" />
          <!--标题 -->
          <div class="louplus-title">{{item.title}}</div>
          <!-- 最近班次 -->
          <div class="louplus-opentime">最近班次{{item.open_time}}</div>
        </div>
      </div>
    </div>
    <!-- 课程分类 classfication:存储课程分类的全部数据的数组 -->
    <div class="Practice-course" v-for="(item,index) in classfication" :key="item.id">
      <!-- 头部标题 -->
      <div class="course-tltle flexbtw">
        <!-- 左边 大标题+介绍 -->
        <div>
          <span class="course-tltle-strong">{{item.classify_name}}</span>
          <!--  后端开发&云计算与大数据没有介绍，不需要打印 | -->
          <span v-if="index!==3 && index!==4" class="course-tltle-strong">|</span>
          <span v-if="index!==3 && index!==4">{{item.description}}</span>
        </div>
        <!-- 右边 前往更多》 -->
        <div>
          更多
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <!-- 当数据为 后端开发 或者 云计算与大数据 时 使用左右结构 -->
      <div v-if="index===3||index===4" class="flexbtw">
        <!-- 左边图片 横跨两行 -->
        <div>
          <img :src="item.recommend_course.picture_url" class="backend-course" />
        </div>
        <!-- 右边主要内容 flex分布 -->
        <div class="backend-right flexbtw">
          <!-- item.courses 每一大项下面的课程信息 -->
          <div v-for="(item1) in item.courses" :key="item1.id" class="classify-card">
            <!-- 课程图片 -->
            <img :src="item1.picture_url" alt class="classify-img" />
            <!-- 课程标题+9课程介绍 介绍只有在hover浮动时才会显示 -->
            <div class="classify-title">
               <div class="carse-titles">{{item1.name}}</div>
              <div class="classify-descrip">{{item1.description}}</div>
            </div>
            <!-- 学生人数 -->
            <div class="classify-opentime">
              <i class="el-icon-s-custom"></i>
              {{item1.students_count}}
            </div>
          </div>
        </div>
      </div>
      <!-- 当数据为 其他 时 使用循序结构 -->
      <div v-else class="flexbtw">
        <!-- 当为精选项目课时 显示横跨两格的大图片 -->
        <div v-if="index===0">
          <img :src="item.recommend_course.picture_url" class="recommend_course" />
        </div>
        <!-- item.courses 每一大项下面的课程信息 -->
        <div v-for="(item1) in item.courses" :key="item1.id" class="classify-card">
          <!-- 课程图片 -->
          <img :src="item1.picture_url" alt class="classify-img" />
          <!-- 课程标题+9课程介绍 介绍只有在hover浮动时才会显示 -->
          <div class="classify-title">
            <div class="carse-titles">{{item1.name}}</div>
            <div class="classify-descrip">{{item1.description}}</div>
          </div>
          <!-- 学生人数 -->
          <div class="classify-opentime">
            <i class="el-icon-s-custom"></i>
            {{item1.students_count}}
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
      // louplus 存储楼+数据的数组
      louplus: [],
      // classfication:存储课程分类的全部数据的数组
      classfication: []
    };
  },
  components: {},
  methods: {
    // 获取 楼+ 相关数据
    getlouplus() {
      this.$axios
        .req("/louplus/")
        .then(res => {
          this.louplus = res.splice(0, 4);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取 课程分类 相关数据
    getclassfication() {
      this.$axios
        .req("/classfication-courses/")
        .then(res => {
          this.classfication = res;
          this.classfication[1].courses = this.classfication[1].courses.splice(
            0,
            4
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getlouplus();
    this.getclassfication();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// 所有信息居中对齐
.Practice-course {
  width: 70vw;
  margin: 10px auto;
}
// 每一项标题行
.course-tltle {
  width: 100%;
  color: rgb(48, 48, 48);
  font-size: 14px;
  line-height: 40px;
  display: flex;
}
// 开始标题加粗
.course-tltle-strong {
  font-size: 24px;
  font-weight: 500;
}
// 楼+ 卡片
.louplus-card {
  margin: 10px auto;
  width: 250px;
  height: 170px;
  background: #fff;
  border-bottom: 1px solid rgb(185, 185, 185);
  border-right: 1px solid rgb(204, 204, 204);
  border-radius: 10px;
}
.louplus-card:hover {
  box-shadow: 0 0 8px 1px rgb(179, 176, 176);
}
// 楼+ 每项图片
.louplus-img {
  width: 250px;
  height: 90px;
  border-radius: 10px 10px 0 0;
}
// 楼+ 每项标题
.louplus-title {
  margin-left: 8px;
}
// 楼+ 开班时间
.louplus-opentime {
  margin-left: 10px;
  font-size: 14px;
  color: rgb(124, 124, 124);
}
// 课程分类 每项卡片
.classify-card {
  margin: 5px 0;
  width: 250px;
  height: 240px;
  background: #fff;
  border-bottom: 1px solid rgb(185, 185, 185);
  border-right: 1px solid rgb(204, 204, 204);
  border-radius: 10px;
  position: relative;
}
.classify-card:hover {
  box-shadow: 0 0 8px 1px rgb(179, 176, 176);
  .classify-title {
    transform: translateY(-45px);
  }
}
// 课程分类 每项图片
.classify-img {
  width: 250px;
  height: 150px;
  border-radius: 10px 10px 0 0;
}
// 课程分类 每项图片下方部分
.classify-title {
  // height: 50px;
  padding: 0 8px;
  transition: all 0.5s;
  width: 234px;
  background: rgb(255, 255, 255);
}
// 课程分类 每项标题 超过部分省略显示
.carse-titles {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
// 课程分类 每项学生人数
.classify-opentime {
  width: 98%;
  padding: 5px 0 10px;
  position: absolute;
  left: 5px;
  bottom: 8px;
  font-size: 14px;
  color: rgb(124, 124, 124);
  z-index: 2;
  background: #fff;
}
// 课程分类 每项课程介绍
.classify-descrip {
  width: 230px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 15px;
  height: 44px;
  font-size: 12px;
  color: rgb(124, 124, 124);
  background: #fff;
  z-index: 1;
}
// 课程分类 横跨两格的大图片
.recommend_course {
  width: 540px;
  height: 240px;
  background: #fff;
  border-bottom: 1px solid rgb(185, 185, 185);
  border-right: 1px solid rgb(204, 204, 204);
  border-radius: 10px;
  position: relative;
}
// 课程分类 横跨两行的大图片
.backend-course {
  margin: 12px;
  width: 255px;
  height: 488px;
  background: #fff;
  border-bottom: 1px solid rgb(185, 185, 185);
  border-right: 1px solid rgb(204, 204, 204);
  border-radius: 10px;
  position: relative;
}
.backend-course:hover {
  box-shadow: 0 0 8px 1px rgb(179, 176, 176);
}
// 课程分类 存在横跨两行的大图片时 左右分开
.backend-right {
  width: 827px;
  height: 480px;
}
</style>