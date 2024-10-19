<template>
  <div id="app">
    <tab v-model="activekey1" @on-click="chart_bloodpressure_click">
      <pane name="1" label="周">
        <div ref="chart_bloodpressure_week" class="myChart"></div>
      </pane>
      <pane name="2" label="月">
        <div ref="chart_bloodpressure_month" class="myChart"></div>
      </pane>
    </tab>
    <div class="weui-panel">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
          <div class="weui-cells">
            <router-link :to="{name: 'monitor_bloodpressurelist'}" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd weui-cell_primary">
                <p class="center-list-txt">显示全部数据</p>
              </div>
              <span class="weui-cell__ft"></span>
            </router-link>
            <router-link :to="{name: 'monitor_addbloodpressure'}" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd weui-cell_primary">
                <p class="center-list-txt">新增数据</p>
              </div>
              <span class="weui-cell__ft"></span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="lantiao"></div>
    <tab v-model="activekey2" @on-click="chart_bloodglucose_click">
      <pane name="1" label="周">
        <div ref="chart_bloodglucose_week" class="myChart"></div>
      </pane>
      <pane name="2" label="月">
        <div ref="chart_bloodglucose_month" class="myChart"></div>
      </pane>
    </tab>
    <div class="weui-panel">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
          <div class="weui-cells">
            <router-link :to="{name: 'monitor_bloodglucoselist'}" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd weui-cell_primary">
                <p class="center-list-txt">显示全部数据</p>
              </div>
              <span class="weui-cell__ft"></span>
            </router-link>
            <router-link :to="{name: 'monitor_addbloodglucose'}" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd weui-cell_primary">
                <p class="center-list-txt">新增数据</p>
              </div>
              <span class="weui-cell__ft"></span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="lantiao"></div>
    <tab v-model="activekey3" @on-click="chart_weight_click">
      <pane name="1" label="周">
        <div ref="chart_weight_week" class="myChart"></div>
      </pane>
      <pane name="2" label="月">
        <div ref="chart_weight_month" class="myChart"></div>
      </pane>
    </tab>
    <div class="weui-panel">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_small-appmsg">
          <div class="weui-cells">
            <router-link :to="{name: 'monitor_weightlist'}" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd weui-cell_primary">
                <p class="center-list-txt">显示全部数据</p>
              </div>
              <span class="weui-cell__ft"></span>
            </router-link>
            <router-link :to="{name: 'monitor_addweight'}" class="weui-cell weui-cell_access">
              <div class="weui-cell__bd weui-cell_primary">
                <p class="center-list-txt">新增数据</p>
              </div>
              <span class="weui-cell__ft"></span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBloodPressureBarChart, getBloodGlucoseBarChart, getWeightBarChart } from '@/api/monitor'
import tab from '@/components/tab/Tab'
import pane from '@/components/tab/Pane'
var echarts = require('echarts')

export default {
  name: 'monitor_record',
  data () {
    return {
      activekey1: '1',
      activekey2: '1',
      activekey3: '1'
    }
  },
  components: {
    tab,
    pane
  },
  mounted () {
    this.initEcharts_bloodpressure(this.$refs.chart_bloodpressure_week)
    this.initEcharts_bloodglucose(this.$refs.chart_bloodglucose_week)
    this.initEcharts_weight(this.$refs.chart_weight_week)
  },
  methods: {
    /** 血压图表 */
    initEcharts_bloodpressure (el) {
      getBloodPressureBarChart(this.activekey1).then(res => {
        var listSystolicPre = res.listSystolicPre.map(c => {
          if (c >= 140 || c <= 90) {
            let item = {
              value: c,
              itemStyle: { color: '#FF0030' }
            }
            return item
          }
          return c
        })
        var listDiastolicPre = res.listDiastolicPre.map(c => {
          if (c >= 90 || c <= 60) {
            let item = {
              value: c,
              itemStyle: { color: '#FF0030' }
            }
            return item
          }
          return c
        })
        var myChart = echarts.init(el)
        var colors = ['#01D2D8', '#72B7E1']
        myChart.setOption({
          legend: {
            data: ['收缩压(高压)', '舒张压(低压)']
          },
          color: colors,
          xAxis: [
            {
              name: '日期',
              nameGap: '1',
              boundaryGap: true,
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                show: true
              },
              axisLabel: {
                interval: 0,
                rotate: 45
              },
              data: res.dateForXAxis
            }
          ],
          yAxis: {
            type: 'value',
            name: '血压(mmHg)',
            min: 0,
            max: 180,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: 'black'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: [
            {
              name: '收缩压(高压)',
              type: 'bar',
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: 'black',
                      fontSize: 6
                    }
                  }
                }
              },
              data: listSystolicPre
            },
            {
              name: '舒张压(低压)',
              type: 'bar',
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: 'black',
                      fontSize: 6
                    }
                  }
                }
              },
              data: listDiastolicPre
            }
          ]
        })
      })
    },
    chart_bloodpressure_click () {
      let el = this.activekey1 === 1 ? this.$refs.chart_bloodpressure_week : this.$refs.chart_bloodpressure_month
      this.$nextTick(() => {
        this.initEcharts_bloodpressure(el)
      })
    },
    /** 血糖图表 */
    initEcharts_bloodglucose (el) {
      getBloodGlucoseBarChart(this.activekey2).then(res => {
        var myChart = echarts.init(el)
        myChart.setOption({
          legend: {
            data: ['血糖值']
          },
          // X轴
          xAxis: {
            name: '日期',
            nameGap: '1',
            boundaryGap: true,
            data: res.dateForXAxis,
            axisTick: {
              show: true
            },
            axisLine: {
              show: true
            },
            axisLabel: {
              interval: 0,
              rotate: 45
            }
          },
          // Y轴
          yAxis: {
            type: 'value',
            scale: true,
            name: '血糖(mmol/L)',
            max: 12,
            min: 0
          },
          // 数据
          series: [
            {
              name: '血糖值',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: '#01D2D8',
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: 'black',
                      fontSize: 6
                    }
                  }
                }
              },
              data: res.bloodGlucoseData
            }
          ]
        })
      })
    },
    chart_bloodglucose_click () {
      let el = this.activekey2 === 1 ? this.$refs.chart_bloodglucose_week : this.$refs.chart_bloodglucose_month
      this.$nextTick(() => {
        this.initEcharts_bloodglucose(el)
      })
    },
    /** 体重图表 */
    initEcharts_weight (el) {
      getWeightBarChart(this.activekey3).then(res => {
        var myChart = echarts.init(el)
        myChart.setOption({
          legend: {
            data: ['体重值']
          },
          // X轴
          xAxis: {
            name: '日期',
            nameGap: '1',
            boundaryGap: true,
            data: res.dateForXAxis,
            axisTick: {
              show: true
            },
            axisLine: {
              show: true
            },
            axisLabel: {
              interval: 0,
              rotate: 45
            }
          },
          // Y轴
          yAxis: {
            type: 'value',
            scale: true,
            name: '体重(kg)',
            max: 200,
            min: 0
          },
          // 数据
          series: [
            {
              name: '体重值',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: '#01D2D8',
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: 'black',
                      fontSize: 6
                    }
                  }
                }
              },
              data: res.weightData
            }
          ]
        })
      })
    },
    chart_weight_click () {
      let el = this.activekey3 === 1 ? this.$refs.chart_weight_week : this.$refs.chart_weight_month
      this.$nextTick(() => {
        this.initEcharts_weight(el)
      })
    }
  }
}
</script>

<style lang="less">
@import '../../assets/css/global.less';

.lantiao {
  width: 100%;
  .rem(height,20);
  background: #699ad2
}

.center-list-txt {
  font-family: MicrosoftYaHeiLight;
  font-size: 18px;
}
.myChart {
  .rem(width,700);
  .rem(height,500);
  margin: 10px auto;
}

.tab{
  .rem(width,700);
  margin: 10px auto;
}

.tab-bar{
  .rem(height,70);
  .rem(line-height,70);
  .rem(font-size,30);
  background:rgba(255,255,255,1);
  border:2px solid rgba(1, 210, 216, 1);
  border-radius:5px;
  font-family:MicrosoftYaHeiLight;
  font-weight:300;
}

.tab-bar-item{
  .rem(height,71);
  width: 50%;
  font-family:MicrosoftYaHeiLight;
  font-weight:300;
  color:rgba(1,210,216,1);
  display: inline-block;
  text-align: center;
}

.tab-bar-item-active{
  background-color: #01D2D8;
  color:rgba(255,255,255,1);
}
</style>

<style lang="less" scoped>
.weui-cell:before{
  left: 0;
}
</style>
