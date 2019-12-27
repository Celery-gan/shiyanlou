<template>
  <div>
    <!-- <backtop> -->
    <div>
      <comheader></comheader>
    </div>
    <div>
      <router-view></router-view>
    </div>
    <div>
      <Cbottom></Cbottom>
    </div>
    <!-- </backtop> -->
  </div>
</template>

<script>
// import backtop from "../../components/Backtop";
import Cbottom from "../../components/common/comBottom";
import comheader from "../../components/common/comHeader";
export default {
  data() {
    return {};
  },
  components: {
    // backtop,
    Cbottom,
    comheader
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style lang='scss'>
.flexbtw {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.flexeve {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}
</style>