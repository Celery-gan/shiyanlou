<template>
  <div class="Practice-course">
    <!-- 训练营强化 -->
    <div class="course-tltle flexbtw">
      <!-- 标题 + 介绍 -->
      <div>
        <span class="course-tltle-strong">训练营强化 |</span>
        专注实战的完整项目，在实战中融会贯通
      </div>
      <!-- 前往更多 -->
      <div>
        更多
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <!-- bootcamp 存储训练营强化相关数据的数组 左右结构 -->
    <div v-for="item in bootcamp" :key="item.id" class="flexbtw">
      <!-- 图片 -->
      <div class="bootcamp-img">
        <img :src="item.picture_url" class="bootcamp-img" />
      </div>
      <!-- 信息 -->
      <div class="bootcamp-info">
        <!-- 标题 title -->
        <div>{{item.name}}</div>
        <!-- 描述 description -->
        <div class="bootcamp-detail">{{item.description}}</div>
        <!--  tags + 点击详情按钮-->
        <div class="flexbtw">
          <div class="bootcamp-detail">
            <div v-for="item1 in item.tags" :key="item1.id">{{item1}}</div>
          </div>
          <el-button type="primary">查看详情</el-button>
        </div>
      </div>
    </div>
    <!-- 学习路径 -->
    <div class="course-tltle flexbtw">
      <!-- 标题 + 介绍 -->
      <div>
        <span class="course-tltle-strong">学习路径 |</span>
        精准而系统的学习路径，从0到大牛
      </div>
      <!-- 前往更多 -->
      <div>
        更多
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <!-- 顺序结构 -->
    <div class="flexbtw">
      <!-- paths 存储学习路径化相关数据的数组 -->
      <div v-for="(item1) in paths" :key="item1.id" class="classify-card">
        <!-- 图片 -->
        <img :src="item1.image" class="classify-img" />
        <!-- 类别名称 -->
        <div class="classify-pathname">{{item1.name}}</div>
        <!-- 含有多少课程 -->
        <div class="classify-count">{{item1.courses_count}}门课程</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bootcamp: [],
      paths: []
    };
  },
  components: {},
  methods: {
    getbootcamps() {
      this.$axios
        .req("/bootcamps/")
        .then(res => {
          this.bootcamp = res.splice(0, 4);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getstudypaths() {
      this.$axios
        .req("/paths/")
        .then(res => {
          this.paths = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getbootcamps();
    this.getstudypaths();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.Practice-course {
  width: 70vw;
  margin: 10px auto;
}
.course-tltle {
  width: 100%;
  color: rgb(48, 48, 48);
  font-size: 14px;
  line-height: 40px;
  display: flex;
}
.course-tltle-strong {
  font-size: 24px;
  font-weight: 500;
}
.bootcamp-img {
  width: 460px;
  height: 250px;
}
.bootcamp-info {
  width: 620px;
  height: 240px;
  margin: 10px;
}
.bootcamp-detail {
  font-size: 14px;
  color: rgb(70, 70, 70);
  display: flex;
}
.classify-img {
  width: 250px;
  height: 120px;
}
.classify-card {
  margin: 5px 0;
  width: 250px;
  height: 220px;
  background: #fff;
  border-bottom: 1px solid rgb(185, 185, 185);
  border-right: 1px solid rgb(204, 204, 204);
  transition: all 0.2s;
}
.classify-card:hover {
  box-shadow: 0 0 8px 1px rgb(179, 176, 176);
  transform: translateY(-6px);
}
.classify-pathname {
  line-height: 40px;
  text-align: center;
}
.classify-count {
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: rgb(160, 160, 160);
}
</style>