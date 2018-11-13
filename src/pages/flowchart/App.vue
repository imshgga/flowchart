<template lang="html">
  <div class="app">
    <div class="CsQuery">
      <form class="form" @submit.prevent="handleSubmit()">
          <label class="form-item">
            活动ID: <input type="text" name="actId" v-model="meta.actId">
          </label>
          <label class="form-item">
            行为类型: <input type="text" name="type" v-model="meta.type">
          </label>
          <label class="form-item">
            规则描述: <input type="text" name="ruleDesc" v-model="meta.ruleDesc">
          </label>
          <button type="submit" name="submit" class="submit">保存</button>
        </form>
    </div>

    <div class="content">
      <CsSidebar v-once></CsSidebar>
      <CsMain ref="flowchart" v-once></CsMain>
    </div>
  </div>
</template>

<script>
import CsSidebar from './components/CsSidebar'
import CsMain from './components/CsMain'
import parseUrlSearchToObj from '@/utils/parseUrlSearchToObj'

let meta = parseUrlSearchToObj()
export default {
  name: 'App',
  components: {
    CsSidebar,
    CsMain,
  },

  data () {
    return {
      meta: meta,
      chartListMap: {},
      showDialog: true,
    }
  },

  methods: {
    handleSubmit () {
      let chartListMap = this.chartListMap = this.$refs.flowchart.$getChartListMap()
      let chartList = JSON.parse(JSON.stringify(Object.values(chartListMap)))
      let formatedData = this.formatData(chartListMap)
      let meta = this.meta
      console.log('formatedData', JSON.stringify(formatedData))
      console.log('chartList', JSON.stringify(chartList))
      console.log('meta', JSON.stringify(meta))
    },
    formatData (chartListMap) {
      let entries = Object.entries(chartListMap)

      let result = {}
      entries.forEach(([eid, item]) => {
        chartListMap[eid].payload = this.formatPayload(item.payload)
        if (item.link) {
          result = {
            nodeType: item.nodeType,
            nodeName: item.nodeName,
            desc: item.desc,
            yes: chartListMap[item.link],
          }
        } else {
          let slots = item.slots || []
          slots.forEach(slot => {
            let slotType = slot.slotType
            let link = slot.link
            chartListMap[eid][slotType] = chartListMap[link]
            delete chartListMap[eid].slots
            delete chartListMap[eid].x
            delete chartListMap[eid].y
            delete chartListMap[eid].eid
          })
        }
      })

      return result
    },
    formatPayload (payload) {
      let result = {}
      Object.keys(payload).forEach(key => {
        result[key] = payload[key].value
      })
      return result
    }
  }
}
</script>

<style lang="scss">
html, body{
  height: 100%;
  color: #5E5E5E;
  background-color: #f5f5f5;
}

.app{
  height: 100%;
}

.CsQuery {
  width: 100%;
  background-color: #fff;
  height: 90px;
  position: fixed;
  top: 0;
  left: 0;

  .form{
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 40px;
  }
  .form-item{
    padding-left: 20px;

  }
}

.content{
  display: flex;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding-top: 90px;
  background-color: #f5f5f5;
}

.CsMain {
  flex: 1;
  height: calc(100% - 80px);
  background-color: red;
  margin: 40px 20px;
  background-color: #fff;
  border-radius: 4px;
  overflow: auto;
}

</style>
