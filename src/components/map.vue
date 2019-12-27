<template>
  <div>
    <el-amap
      vid="amapDemo"
      :center="center"
      :zoom="zoom"
      :plugin="plugin"
      class="amap-demo"
      style="height:130px;"
    ></el-amap>
  </div>
</template>

<script>
export default {
  data() {
    let self = this;
    return {
      zoom: 16,
      center: [121.59996, 31.197646],
      plugin: [
        {
          pName: "Geolocation",
          events: {
            init(o) {
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = trueself.$nextTick();
                }
              });
            }
          }
        }
      ]
    };
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>