import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/reset.css';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import service from "./http"
import dayjs from "dayjs"
import axios from 'axios'
import VCharts from 'v-charts'
import JsonExcel from 'vue-json-excel'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import lodash from 'lodash'

// import AMap from 'vue-amap';
// Vue.use(AMap);
// // 初始化vue-amap
// AMap.initAMapApiLoader({
//     // 高德key
//     key: '93a7a99c7b8d4781d8652ac5580580cb',
//     // 插件集合 （插件按需引入）
//     plugin: ['AMap.Geolocation']
// });

import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
        key: '93a7a99c7b8d4781d8652ac5580580cb',
        plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.Walking', 'AMap.CloudDataLayer', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
        v: '1.4.4',
        uiVersion: '1.0'
    })
    // key： 高德的key（自己申请）
    // plugin： 引用的插件（根据需要引入）
    // v： 高德SDK 版本
    // uiVersion：UI库 版本
    // 地图工具条插件 （AMap.ToolBar）包括缩放控件，用户可控制缩放按钮是用滑动滚动条还是“+/-”按钮形式，方向键盘控件、自动定位控制。添加之后默认位于地图左上角。
    // 地图鹰眼插件 （AMap.OverView）加载此插件后，会在地图右下角显示一个地图简略的概览，用于在更广阔的区域反映当前的地图视口，支持用户控制此鹰眼是打开状态还是关闭状态。添加之后默认位于地图右下角。
    // 地图比例尺插件 （AMap.Scale）用于显示地图比例关系，添加之后默认位于地图左下角。
    // 圆编辑插件 （AMap.Circle）用于编辑AMap.Circle对象。通过该插件可以使用鼠标拖动直接修改圆的半径，改变圆心的位置。
    // 折线、多边形编辑插件 （AMap.PolyEditor）用于编辑AMap.Polyline、AMap.Polygon对象。通过该插件可以使用鼠标将折线上的各个节点或多边形的各个顶点调整到目标位置，在折线上新增、删除节点或在多边形上新增、删除顶点，拖拽多边形到目标位置。
    // 拖拽导航插件 （AMap.DragRoute）通过鼠标拖拽已有导航路径上的任一点，可以实现导航起点、途经点、终点的调整，系统根据调整后的起点、途经点、终点信息，实时查询拖拽后的导航路径并在地图上同步显示。
    // 鼠标工具插件 (AMap.MouseTool）通过鼠标工具插件，可以开启鼠标工具，实现鼠标画标注点、画线、画多边形、画矩形、画圆、测距、测面积、拉框放大、拉框缩小等功能。

Vue.component('downloadExcel', JsonExcel)
Vue.use(VCharts)
Vue.use(ElementUI)
Vue.use(mavonEditor)


Vue.prototype.$lodash = lodash
Vue.prototype.$axios = service
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')