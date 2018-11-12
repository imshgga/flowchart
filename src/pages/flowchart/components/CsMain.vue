<template lang="html">
  <div class="CsMain" id="CsMain">
    <div class="zoomWrapper">
      <button type="button" name="button" @click="handleZoom('+')"> + </button>
      <button type="button" name="button" @click="handleZoom('-')"> - </button>
    </div>
    <div class="flowchart-main"  id="flowchart-main"></div>

    <el-dialog
      :visible.sync="dialog.visible"
      :modal="false"
      custom-class="itemEdit"
      :show-close="false"
      center
    >
      <div class="title" slot="title">
        为<span class="strong">{{dialog.desc}}</span>节点添加数据
      </div>
      <div class="inputWrapper" v-for="(value, key) in dialog.payload">
        <label class="label">
          <span class="key">{{key}}: </span><input type="text" v-model="dialog.payload[key]">
        </label>
      </div>
      <span slot="footer" class="dialog-footer">
        <button type="button" @click="handleCancel()">取 消</button>
        <button type="button" @click="handleEnsure()">确 定</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api'
import getInstance from '@/utils/getInstance'
import ktv from '@/utils/ktv'
import setZoom from '@/utils/setZoom'
import getColor from '@/utils/getColor'
import createEid from '@/utils/createEid'
import parseUrlSearchToObj from '@/utils/parseUrlSearchToObj'

let meta = parseUrlSearchToObj()

export default {
  data () {
    return {
      instance: '',
      zoom: 1,
      chartList: [],
      chartListMap: {},
      showDialog: false,
      dialog: {
        visible: false
      },
    }
  },

  mounted () {
    this.$nextTick(() => {
      let instance= this.instance = getInstance('flowchart-main')

      api.getChartList().then(res => {
        this.$renderChart(res)
      })
    })
  },

  methods: {
    $renderChart (res) {
      setTimeout(() => {
        let map = {}
        let chartList = res.map(item => {
          let chartData = this.wrapData(item)
          let eid = chartData.eid

          map[eid] = chartData
          return chartData
        })

        this.chartListMap = map
        this.chartList = chartList

        this.$nextTick(() => {
          this.buildDom()
          this.initChart(chartList)
          this.bindEvent()
          this.initConnect()
        })
      }, 0)
    },

    $getChartListMap () {
      // 绑定坐标
      let keys = Object.keys(this.chartListMap)
      keys.forEach(key => {
        let item = this.chartListMap[key]
        let dom = document.getElementById(item.eid)

        this.chartListMap[key] = {
          ...item,
          x: dom.offsetLeft,
          y: dom.offsetTop,
        }
      })

      return this.chartListMap
    },

    buildDom () {
      let chartList = this.chartList
      let domArr = chartList.map((item, i) => {
        let left = isNaN(Number(item.x)) ? item.x : item.x + 'px'
        let top = isNaN(Number(item.y)) ? item.y : item.y + 'px'

        return `
        <div class="chartItem" id="${item.eid}" style="position: absolute; left: ${left}; top: ${top};">
          ${item.eid}
          <strong>${item.desc}</strong>
          <div class="operate">
            <button type="button" class="itemDel">X</button>
            <button type="button" class="itemEdit">E</button>
          </div>
        </div>
        `
      })

      document.getElementById('flowchart-main').innerHTML = domArr.join('')
    },

    initChart (chartList) {
      let instance = this.instance
      instance.batch(function () {
        chartList.forEach((item, i) => {
          let eid = item.eid

          instance.draggable(eid,{
            filter: ".operator",
          })

          if (item.nodeType === 0) {
            instance.addEndpoint(eid, {
              isSource: true,
              isTarget: false,
              anchor: "BottomCenter",
              endpointStyle: { fill : "#fff", stroke: '#346789', strokeWidth: 1 },
            })
          } else {
            instance.addEndpoint(eid, {
              isSource: false,
              isTarget: true,
              maxConnections: -1,
              anchor: "TopCenter",
              endpoint:["Rectangle", {
                width: 30,
                height: 10,
              }],
              endpointStyle : { fill : "#fff", stroke: "#346789", strokeWidth: 1 },
            })

            ;(item.slots || []).forEach(slot => {
              let endpoint = instance.addEndpoint(eid, {
                isSource: true,
                isTarget: false,
                anchor: slot.layout,
                endpointStyle : { fill :slot.color, stroke: "#346789", strokeWidth: 1 },
              });

              endpoint.pointData = slot
            })
          }
        })
      })
      instance.revalidate('flowchart-main')
    },

    bindEvent () {
      let chartList = this.chartList
      let chartListMap = this.chartListMap
      let instance = this.instance
      let _this = this
      let container = document.getElementById('flowchart-main')

      instance.bind("connection", function (info, event) {
        if (!event) return

        let sourcePointData = info.sourceEndpoint.pointData || {}
        let type = sourcePointData.desc || '开始'
        info.connection.setType('basicConnect', {'connectType': type, 'color': getColor()})
        info.connection.sourcePointData = sourcePointData // 在connectionDetached时用

        _this.updateChartListMapByConnect(info, 'link')
      })

      // 效验是否存在连接,存在时不让连接
      instance.bind("beforeDrop", function (info) {
        let connects = instance.getConnections({
          target: info.targetId,
        })
        return !(connects.length)
      })

      // 取消连接
      instance.bind("connectionDetached", function (info, event) {
        _this.updateChartListMapByConnect(info, 'unlink')
      })

      // 拖拽添加
      // ktv.droppable('flowchart-main', {
      ktv.droppable('CsMain', {
        drop: function (info) {
          console.log('drop', info)
          // 添加数据
          let {
            chartType,
            dx,
            dy,
          } = info.drag.payload

          let chartId = chartType.nodeType
          let eid = createEid(chartId)
          let x = info.e.offsetX - dx
          let y = info.e.offsetY - dy

          let chartData = {
            ...chartType,
            eid,
            x,
            y
          }
          // 更新数据
          _this.chartListMap[eid] = _this.wrapData(chartData)

          // 更新UI
          let chartItem = document.createElement('div')
          chartItem.classList.add('chartItem')
          chartItem.id = chartData.eid
          chartItem.style = `position: absolute; left: ${chartData.x}px; top: ${chartData.y}px;`
          chartItem.innerHTML = `
            ${chartData.eid} <strong>${chartData.desc}</strong>
            <div class="operate">
              <button type="button" class="itemDel">X</button>
              <button type="button" class="itemEdit">E</button>
            </div>
          `

          let fragment = document.createDocumentFragment()
          fragment.appendChild(chartItem)
          container.appendChild(fragment)

          _this.initChart([chartData])
        }
      })

      // 删除功能
      instance.on(container, "click", function (e) {
        if (!e.target.classList.contains('itemDel')) return

        let eid = (e.target|| e.srcElement).parentNode.parentNode.id
        let connects1 = instance.getConnections({
          source: eid,
        })
        let connects2 = instance.getConnections({
          target: eid,
        })

        if (connects1.length + connects2.length > 0) {
          return alert('需要移除所有连接才能删除')
        }

        // 清理UI
        let points1 = instance.selectEndpoints({source: eid})
        let points2 = instance.selectEndpoints({target: eid})
        points1.delete()
        points2.delete()
        container.removeChild(document.getElementById(eid))

        // 删除数据
        delete _this.chartListMap[eid]
      })

      // 编辑功能
      instance.on(container, "click", function (e) {
        if (!e.target.classList.contains('itemEdit')) return

        let eid = (e.target|| e.srcElement).parentNode.parentNode.id
        let chartData = _this.chartListMap[eid]

        _this.dialog = {
          ...chartData,
          visible: true,
        }
      })
    },

    initConnect () {
      let chartList = this.chartList
      let instance = this.instance

      chartList.forEach(item => {
        if (item.nodeType === 0 && item.link) { // 开始节点
          let source = item
          let target = this.getElement(item.link)

          let connect = instance.connect({
            source: source.eid,
            target: target.eid,
            anchors: ["BottomCenter", "TopCenter" ],
            endpoints: ['Dot', ['Rectangle', {
              width: 1,
              height: 1,
            }]],
            endpointStyles:[
              { fill: "#fff" },
              { fill: "#fff" }
            ],
          })
          connect.setType('basicConnect', {'connectType': '开始', 'color': getColor()})

        } else { // 其他节点
          let slots = item.slots || []
          slots.forEach(slot => {
            if (slot.link) {
              let source = item
              let target = this.getElement(slot.link)

              let connect = instance.connect({
                source: source.eid,
                target: target.eid,
                anchors: [slot.layout, "TopCenter" ],
                endpoints: ['Dot', ['Rectangle', {
                  width: 1,
                  height: 1,
                }]],
                endpointStyles:[
                  { fill: slot.color },
                  { fill: "#fff" }
                ],
                data: slot,
              })
              connect.setType('basicConnect', {'connectType': slot.desc, 'color': getColor()})
              connect.sourcePointData = slot
            }
          })
        }
      })
    },

    getElement (eid) {
      let element = this.chartListMap[eid]
      return element
    },

    wrapData (item) {
      let eid = item.eid || createEid(item.nodeType)
      let payload = item.payload || {params: ''}
      if (payload.remark === undefined) payload.remark = ''
      let chartItem = {
        ...item,
        eid,
        payload
      }
      return chartItem
    },

    updateChartListMapByConnect (connectInfo, action) {
      let slotData = connectInfo.connection.sourcePointData || {}
      let sourceEid = connectInfo.source.id
      let targetEid = connectInfo.target.id
      let sourceId = connectInfo.sourceId
      let sourceNodeType = sourceId.split('-')[0]
      // console.log('sourceNodeType', sourceNodeType)

      let link = null
      if (action === 'link') {
        link = targetEid
      }

      let chartData = this.getElement(sourceEid)

      // // TODO:
      if (sourceNodeType === 0) { // 开始节点
        this.chartListMap[sourceEid] = {
          ...chartData,
          link,
        }
        return
      }

      (chartData.slots || []).forEach((slot, i) => {
        if (slot.id === slotData.id) {
          this.chartListMap[sourceEid].slots[i] = {
            ...slot,
            link,
          }
        }
      })
    },

    handleCancel () {
      this.dialog.visible = false
      this.dialog = {
        visible: false
      }
    },

    handleEnsure () {
      this.dialog.visible = false

      let {
        payload,
        eid,
      } = this.dialog

      this.chartListMap[eid].payload = payload
    },

    handleZoom (op) {
      switch (op) {
        case '+':
          this.zoom += 0.05
          break;
        case '-':
          this.zoom -= 0.05
          break;
      }
      setZoom(this.zoom, this.instance)
    }
  }
}
</script>

<style lang="scss">
.CsMain{
  position: relative;

  .flowchart-main{
    height: 800px;
    position: relative;
    border: 1px solid;
  }

  .zoomWrapper{
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 20px;
    z-index: 100;

    button{
      margin-left: 0px;
      border-radius: 13px;
    }
  }

  .chartItem{
    font-size: 13px;
  }

  .operate{
    display: none;
    position: absolute;
    line-height: 18px;
    color: #fff;
    text-align: center;
    top: -14px;
    left: 0px;
    z-index: 99;
    padding: 2px 5px;

    button{
      margin-left: 0px;
      height: 20px;
      width: 20px;
      padding: 0px;
      line-height: 20px;
      border: 1px solid #346789;
      border-radius: 20px;
      color: #346789;
      background-color: #fff;

      &:hover{
        color: #fff;
        background-color: #346789;
      }
    }
  }
  .itemEdit{

    .strong{
      display: inline-block;
      padding: 5px 5px;
      margin: 0px 5px;
      background-color: #346789;
      color: #fff;
      border-radius: 4px;
    }
    .inputWrapper{
      margin: 5px 0px;

      .key{
        display: inline-block;
        width: 100px;
        text-align: right;
      }
      input{
        margin-left: 10px;
      }
    }
  }

  .jtk-endpoint {
    z-index: 32;
  }

  .labelStyle{
    padding: 2px 6px;
    border: 1px solid #346789;
    border-radius: 2px;
    color: #5e5e5e;
    background-color: #346789;
    color: #fff;
    font-size: 14px;
  }
}
</style>
