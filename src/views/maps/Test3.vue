<template>
  <div class="container">
    <div class="search-box">
      <!-- 搜索框 -->
      <input v-model="searchKey" type="search" id="search" />
      <!-- 搜索按钮 -->
      <button @click="searchByHand">搜索</button>
      <!-- ??? -->
      <div class="tip-box" id="searchTip"></div>
    </div>
    <!--
          amap-manager： 地图管理对象
          vid：地图容器节点的ID
          zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
          center： 地图中心点坐标值
          plugin：地图使用的插件
          events： 事件
    -->
    <el-amap
      class="amap-box"
      :amap-manager="amapManager"
      :vid="'amap-vue'"
      :zoom="zoom"
      :plugin="plugin"
      :center="center"
      :events="events"
    >
      <!-- 标记 水滴图标 :position="marker"绑定点击的地点信息 -->
      <el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker>
    </el-amap>
  </div>
</template>


<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
// amapManager 定义地图管理对象
let amapManager = new AMapManager();
export default {
  data() {
    let self = this;
    return {
      // 地址
      address: null,
      // 搜索的关键词
      searchKey: "",
      // 地图管理对象
      amapManager,
      // 水滴标记图标的位置
      markers: [],
      // 地图搜索选择 全国范围   city值为全国的时候，就可以在输入不同城市的时候地图转换为不同的城市
      searchOption: {
        city: "全国",
        citylimit: true
      },
      // center： 地图中心点坐标值
      center: [121.329402, 31.228667],
      // zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
      zoom: 17,
      // 经度
      lng: 0,
      // 维度
      lat: 0,
      // ???
      loaded: false,
      // events： 事件
      events: {
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            self.initSearch();
          });
        },
        // 点击获取地址的数据
        click(e) {
          // console.log(e);
          self.markers = [];
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          self.center = [lng, lat];
          self.markers.push([lng, lat]);
          // 这里通过高德 SDK 完成。
          let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          // 获得地址信息[lng, lat]
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                // 获得地址文字信息
                // console.log(result.regeocode.formattedAddress);
                // 将点击时获得的地址信息给到地址
                self.address = result.regeocode.formattedAddress;
                // 将点击时获得的地址信息显示在搜索框内
                self.searchKey = result.regeocode.formattedAddress;
                self.$nextTick();
                // nextTick原理
                // 1、异步说明
                // Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新
                // 2、事件循环说明
                // 简单来说，Vue 在修改数据后，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。
              }
            }
          });
        }
      },
      // 一些工具插件
      plugin: [
        {
          pName: "Geocoder",
          events: {
            init(o) {
              console.log(o.getAddress());
            }
          }
        },
        {
          // 定位
          pName: "Geolocation",
          events: {
            init(o) {
              // o是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  // 设置经度
                  self.lng = result.position.lng;
                  // 设置维度
                  self.lat = result.position.lat;
                  // 设置坐标
                  self.center = [self.lng, self.lat];
                  self.markers.push([self.lng, self.lat]);
                  // load
                  self.loaded = true;
                  // 页面渲染好后
                  self.$nextTick();
                }
              });
            }
          }
        },
        {
          // 工具栏
          pName: "ToolBar",
          events: {
            init(instance) {
              console.log(instance);
            }
          }
        },
        {
          // 鹰眼
          pName: "OverView",
          events: {
            init(instance) {
              console.log(instance);
            }
          }
        },
        {
          // 地图类型
          pName: "MapType",
          defaultType: 0,
          events: {
            init(instance) {
              console.log(instance);
            }
          }
        },
        {
          // 搜索
          pName: "PlaceSearch",
          events: {
            init(instance) {
              console.log(instance);
            }
          }
        }
      ]
    };
  },
  methods: {
    initSearch() {
      let vm = this;
      let map = this.amapManager.getMap();
      AMapUI.loadUI(["misc/PoiPicker"], function(PoiPicker) {
        var poiPicker = new PoiPicker({
          input: "search",
          placeSearchOptions: {
            map: map,
            pageSize: 10
          },
          suggestContainer: "searchTip",
          searchResultsContainer: "searchTip"
        });
        vm.poiPicker = poiPicker;
        // 监听poi选中信息
        poiPicker.on("poiPicked", function(poiResult) {
          // console.log(poiResult)
          let source = poiResult.source;
          let poi = poiResult.item;
          if (source !== "search") {
            poiPicker.searchByKeyword(poi.name);
          } else {
            poiPicker.clearSearchResults();
            vm.markers = [];
            let lng = poi.location.lng;
            let lat = poi.location.lat;
            let address = poi.cityname + poi.adname + poi.name;
            vm.center = [lng, lat];
            vm.markers.push([lng, lat]);
            vm.lng = lng;
            vm.lat = lat;
            vm.address = address;
            vm.searchKey = address;
          }
        });
      });
    },
    searchByHand() {
      if (this.searchKey !== "") {
        this.poiPicker.searchByKeyword(this.searchKey);
      }
    }
  }
};
</script>

<style>
.container {
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  border: 1px solid #999;
}

.search-box {
  position: absolute;
  z-index: 5;
  width: 70%;
  left: 13%;
  top: 10px;
  height: 30px;
}

.search-box input {
  float: left;
  width: 80%;
  height: 100%;
  border: 1px solid #30ccc1;
  padding: 0 8px;
  outline: none;
}

.search-box button {
  float: left;
  width: 20%;
  height: 100%;
  background: #30ccc1;
  border: 1px solid #30ccc1;
  color: #fff;
  outline: none;
}

.tip-box {
  width: 100%;
  max-height: 260px;
  position: absolute;
  top: 30px;
  overflow-y: auto;
  background-color: #fff;
}
</style>