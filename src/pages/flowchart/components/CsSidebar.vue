<template lang="html">
  <div class="CsSidebar">
    <ul class="flowchart-sidebar" id="flowchart-sidebar">
      <!-- <li v-for="item in chartTypes" class="chartItemWrapper">
        <div class="chartItem" :id="`chartType-${item.id}`"></div>
      </li> -->
    </ul>
  </div>
</template>

<script>
import getInstance from '@/utils/getInstance'
import ktv from '@/utils/ktv'
import * as api from '@/api'
import parseUrlSearchToObj from '@/utils/parseUrlSearchToObj'

let meta = parseUrlSearchToObj()

export default {
  name: 'CsSidebar',
  data () {
    return {
      instance: '',
      chartTypes: [],
      ktv: ktv
    }
  },

  mounted () {
    this.$nextTick(() => {
      let instance = this.instance = getInstance('flowchart-sidebar')
      api.getChartTypes().then(res => {
        this.chartTypes = res
        this.$nextTick(() => {
          // this.initChartTypes()
          this.buildDom()
          this.initChart()
          this.bindEvent()
        })
      })
    })
  },

  methods: {
    buildDom () {
      let chartTypes = this.chartTypes
      let domArr = chartTypes.map((item, i) => {

        return `
          <li class="chartItemWrapper">
            <div class="chartItem" id="chartType-${item.nodeType}">${item.desc}</div>
          </li>
          `
      })

      document.getElementById('flowchart-sidebar').innerHTML = domArr.join('')
    },

    initChart () {
      let instance = this.instance
      let chartTypes = this.chartTypes
      let chartItem = document.querySelectorAll("#flowchart-sidebar .chartItem")

      instance.batch(function () {
        chartTypes.forEach((item, i) => {
          if (item.nodeType === 0) {
            instance.addEndpoint(chartItem[i], {
              isSource: false,
              isTarget: false,
              anchor: "BottomCenter",
              endpointStyle: { fill : "#fff", stroke: '#346789', strokeWidth: 1 },
            })
          } else {
            instance.addEndpoint(chartItem[i], {
              isSource: false,
              isTarget: false,
              maxConnections: 0,
              anchor: "TopCenter",
              endpoint:["Rectangle", {
                width: 30,
                height: 10,
              }],
              endpointStyle : { fill : "#fff", stroke: "#346789", strokeWidth: 1 },
            })

            ;(item.slots || []).forEach(slot => {
              let endpoint = instance.addEndpoint(chartItem[i], {
                isSource: false,
                isTarget: false,
                anchor: slot.layout,
                endpointStyle : { fill :slot.color, stroke: "#346789", strokeWidth: 1 },
              })
            })
          }
        })
      })
    },

    bindEvent () {
      let chartData = this.chartData
      let instance = this.instance
      let _this = this
      let chartItem = document.querySelectorAll("#flowchart-sidebar .chartItem")

      ktv.draggable(chartItem, {
        clone: true,
        start: function(info) {
          let chartId = info.el.id.split('-')[1] || ''

          info.drag.payload = {
            dx: info.e.offsetX,
            dy: info.e.offsetY,
            chartType: _this.getChartTypeById(chartId)
          }
        },
      })

    },

    getChartTypeById (id) {
      let [chartType = {}] = this.chartTypes.filter(item => (item.nodeType == id))
      return chartType
    }
  },
}
</script>

<style lang="scss">
.CsSidebar{
  width: 280px;
  background-color: #fff;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: 2px solid #f4f8f9;
  border-right: 1px solid transparent;
  box-shadow: 0 4px 7px #f4f8f9;
  height: 100%;
  box-sizing: border-box;
  padding-top: 40px;

  .flowchart-sidebar{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;

    .chartItemWrapper{
      position: relative;
      margin-bottom: 40px;
      width: 150px;
      height: 50px;
    }
  }
}


</style>
