<template>
  <div>
    <!-- 表格显示数据 list(tabform) 是分好页的数组 -->
    <el-table :data="list(tabform)" class="product-list">
      <!-- prop 表格对应列内容的字段名 -->
      <!-- label 表格显示的标题 -->
      <!-- width	表格对应列的宽度 默认每列平方 -->
      <el-table-column prop="NAME" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="GOODS_SERIAL_NUMBER" label="商品编号" align="center"></el-table-column>
      <el-table-column prop="ORI_PRICE" label="原价" align="center"></el-table-column>
      <el-table-column prop="PRESENT_PRICE" label="现价" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <!-- 表格的数据操作 要用  template slot-scope="scope" -->
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="del(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- dialog 不属于任何结构 -->
    <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible">
      <!--第一项输入 商品名称 -->
      <el-form :model="obj1">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="obj1.NAME" autocomplete="off"></el-input>
        </el-form-item>
        <!--第二项输入 商品原价 -->
        <el-form-item label="商品原价" :label-width="formLabelWidth">
          <el-input v-model="obj1.ORI_PRICE" autocomplete="off"></el-input>
        </el-form-item>
        <!--第三项输入 商品现价 -->
        <el-form-item label="商品现价" :label-width="formLabelWidth">
          <el-input v-model="obj1.PRESENT_PRICE" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 取消按钮 -->
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- 确认按钮 -->
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <!-- @size-change事件 pageSize(每页显示条目个数，支持.sync修饰符) 改变时会触发 -->
    <!-- @current-change事件 currentPage(当前页数，支持.sync修饰符) 改变时会触发 -->
    <!-- :page-sizes="[10, 20, 30, 40]" 每页显示数量选择（10条/页 20条/页 30条/页 40条/页） -->
    <!-- :page-size="10" 当前每页显示条数 -->
    <!-- layout 组件布局，子组件名用逗号分隔 -->
    <!-- :total="list.length" 总条数 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100, 200]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tabform.length"
    ></el-pagination>

    <!-- 导出 excel
    <download-excel class="export-excel-wrapper" :data="tabform" name="tabform.xls">
      上面可以自定义自己的样式，还可以引用其他组件button
      <el-button type="primary" size="small">导出xls</el-button>
    </download-excel> -->
  </div>
</template>

<script>
export default {
  props: {
    tabform: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 分页 相关数据
      currentPage: 1,
      pagesize: 10,
      // dislog 相关数据
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      obj1: {},
      formLabelWidth: "80px"
    };
  },
  components: {},
  methods: {
    handleSizeChange(val) {
      //@size-change事件
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      //@current-change事件
      this.currentPage = val;
    },
    list(tabform) {
      // 使用时页面内容循环体应为 v-for(item in divide(arr))
      return tabform.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    // 删除表格数据
    del(index) {
      this.$parent.tabform.splice(index, 1);
    },
    // 编辑表格数据
    edit(row) {
      // 是否显示 Dialog，支持 .sync 修饰符
      this.dialogFormVisible = true;
      this.obj1 = row;
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.product-list {
  margin: 8px auto;
  width: 84vw;
}
</style>