<template>
     <div class="container">
    <div class="head"><h1>苍南县政审批服务中心可视化平台</h1></div>
    <div class="content">
      <div class="left">
        <!--        桥墩镇预约人数统计-->
<!--        <div class="leftBox">-->
<!--          <div class="head"><h2>桥墩镇预约人数统计</h2></div>-->
<!--          <div class="toplist">-->
<!--            <ul>-->
<!--            <li style="background-color: #25cef3">日统计</li>-->
<!--            <li>周统计</li>-->
<!--            <li>月统计</li>-->
<!--          </ul>-->
<!--          </div>-->
<!--          <div id="myChart" :style="{height: '350px'}"></div>-->
<!--        </div>-->

        <!--        热点事项办理统计TOP10-->
        <div class="leftBox">
          <div class="head"><h2>热点事项办理统计TOP10</h2></div>
          <div class="text">
            <ul v-for="(T,index) in num" :key="index" :class="{off:index%2!=0}">
              <li :style="bStyle(index)">{{T.num}}</li>
              <li>{{T.event}}</li>
            </ul>

          </div>
        </div>
      </div>

        <!--      center-->
      <div class="center">
        <div class="current">
          <ul  v-for="(item,index) in list" :key="index">
            <li :style="aStyle(index)">{{item.event}}</li>
            <li>{{item.num}}</li>
          </ul>
        </div>
        <div id="mapChart" style="height: 500px;"></div>
      </div>

      <div class="right">
        <!--        承诺件办结效能对比-->
        <div class="rightBox">
          <div class="head"><h2>承诺件办结效能对比</h2></div>
          <div class=" tooltip">
            <ul>
              <li style="background-color: #25cef3;"></li>
              <li>法定办结时长</li>
            </ul>
            <ul>
              <li style="background-color: #f3c525;"></li>
              <li>平均办结时长</li>
            </ul>
            <ul>
              <li style="background-color: #2cab65;"></li>
              <li>实际办结时长</li>
            </ul>
          </div>
          <div id="myChartFour" :style="{height: '350px'}"></div>
        </div>

        <!--        满意度统计-->
        <div class="rightBox">
          <div class="head"><h2>满意度统计</h2></div>
          <p>评价人数:&nbsp;203人</p>
          <div id="myChartFive" :style="{height: '350px'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import wenzhoushi from '../../static/json/330300.json'

    export default {
        name: "qiaodun",
      data () {
        return {
          num:[
            {num:'NO.1',event:'老年人优待证办理'},
            {num:'NO.2',event:'食品经营许可'},
            {num:'NO.3',event:'食品经营许可'},
            {num:'NO.4',event:'抵押权登记'},
            {num:'NO.5',event:'领取基本医疗保险就医凭证'},
            {num:'NO.6',event:'公共场所许可'},
            {num:'NO.7',event:'领取基本医疗保险就医凭证'},
            {num:'NO.8',event:'领取基本医疗保险就医凭证'},
            {num:'NO.9',event:'领取基本医疗保险就医凭证'},
            {num:'NO.10',event:'领取基本医疗保险就医凭证'}
          ],
          list:[
            {event:'当前预约总人数',num:'45893'},
            {event:'当前预约总人数',num:'45893'},
            {event:'当前预约总人数',num:'45893'}
          ]
        }
      },
      mounted(){
      this.echarts.registerMap("浙江", wenzhoushi);
        this.drawLine();
        this.getMap();
      },
      methods:{
        drawLine(){
          //桥墩镇预约人数统计
          var dom = document.getElementById('myChart')
          var myChart = this.echarts.init(dom)
          myChart.setOption({
            xAxis: {
              type: 'category',
              // 去除x轴上的刻度线
              axisTick: {show: false,},
              //去掉x轴横轴
              axisLine: {show: false,},
              axisLabel:{
                fontSize:'12',
                interval:0,
                color:"#fff",
              }
            },
            yAxis: {
              type: 'value',
              // 去除x轴上的刻度线
              axisTick: {show: false,},
              //去掉x轴横轴
              axisLine: {show: false,},
              //设置网格线样式
              splitLine :{
                lineStyle:{
                  color:['#3d4263'],//设置网格线颜色
                  type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                }, show:true //隐藏或显示
              },
              axisLabel:{
                fontSize:'10',
                interval:0,
                color:"#fff",
              }
            },
            series: [{
              symbolSize: 10,
              data: [1020, 932, 601, 934, 2290],
              type: 'line',
              smooth: true,
              itemStyle:{
                normal:{
                  borderColor: 'rgb(38,40,55)',
                  borderWidth: 3,
                }
              },
              lineStyle: {
                width:4,
                color: 'rgb(37,206,243)',
              },
            }]
          });

          // 承诺件办结效能对比
          var dom = document.getElementById('myChartFour')
          var myChartFour = this.echarts.init(dom)
          myChartFour.setOption({
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              // 去除x轴上的刻度线
              axisTick: {show: false,},
              //去掉x轴横轴
              axisLine: {show: false,},
              axisLabel:{ interval: 0, rotate:300,fontSize:'12', interval:0, color:"#fff",},
              boundaryGap: false,
              data: ['消防局', '发改委', '公安局', '人力资源局', '劳动局', '公安局', '劳动局']
            },
            yAxis: {
              type: 'value',
              splitLine :{
                lineStyle:{color:['#3d4263'], type:'dashed'
                }, show:true},
              axisTick: {show: false,}, // 去除x轴上的刻度线
              axisLine: {
                show: false

              },//去掉x轴横轴
              axisLabel:{
                fontSize:'10',
                interval:0,
                color:"#fff",
              },
            },
            series: [
              {
                symbol: "none",
                name:'法定办结时长',
                type:'line',
                smooth: true,
                areaStyle: {
                  color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(34,116,151)'
                  }, {
                    offset: 1,
                    color: 'rgb(22,45,88)'
                  }])
                },
                data:[0, 2, 11, 18, 21, 20, 12],
                lineStyle: {
                  width:3,
                  color: 'rgb(37,206,243)'
                },
              },
              {
                symbol: "none",
                name:'平均办结时长',
                type:'line',
                smooth: true,
                // sampling: 'average', //  取过滤点的平均值
                areaStyle: {
                  color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(90,79,57)'
                  }, {
                    offset: 1,
                    color: 'rgb(22,41,84)'
                  }])
                },
                data:[0, 2, 20, 14, 10, 40, 4],
                lineStyle: {
                  width:3,
                  color: '#f3c525'
                },
              },
              {
                symbol: "none",
                name:'实际办结时长',
                type:'line',
                smooth: true,
                areaStyle: {
                  color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(38,148,103)'
                  }, {
                    offset: 1,
                    color: 'rgb(24,62,105)'
                  }])
                },
                data:[0, 3, 10, 4, 6, 4, 15],
                lineStyle: {
                  width:3,
                  color: '#2cab65'
                },
              },
            ]
          });

          // 满意度统计
          var dom = document.getElementById('myChartFive')
          var myChartFive = this.echarts.init(dom)
          myChartFive.setOption({

            series : [{
                name: '访问来源',
                type: 'pie',
                radius: ['40%', '60%'],
                color:['#c7310f','#2cab65', '#f3c525'],
                //圆饼数据显示百分比
                label: {
                  formatter: '{b}: {@2012} ({d}%)'
                },
                data:[
                  {value:335, name:'差评'},
                  {value:310, name:'满意'},
                  {value:234, name:'一般'},

                ],
              }
            ]
          });
            },
          aStyle(index) {
          if (index == 0) {return { color: 'green'}}
          else if (index == 1) {return { color: '#efc203'}}
          else if (index == 2) {return { color: 'red'}
          }
        },
        getMap () {
          let mapOption = {
            tooltip: {
              formatter: function (params) {
                var info = '<p style="font-size:18px">' + params.name + '</p><p style="font-size:14px">这里可以写一些，想展示在页面上的别的信息</p>'
                return info;
              },
              backgroundColor: "#ff7f50",//提示标签背景颜色
              textStyle: { color: "#fff" } //提示标签字体颜色
            },
            series: [
              {
                name: '浙江',
                type: 'map',
                mapType: '浙江',
                selectedMode: 'multiple',
                label: {
                  normal: {
                    show: true,//显示省份标签
                    textStyle: { color: "#fff" }//省份标签字体颜色
                  },
                  emphasis: {
                    show: true,//对应的鼠标悬浮效果
                    // textStyle:{color:"#800080"}
                  }
                },
                itemStyle: {
                  normal: {
                    borderWidth: .5,//区域边框宽度
                    borderColor: '#fff',//区域边框颜色
                    areaColor: "#3A66FB",//区域颜色
                  },
                  emphasis: {
                    borderWidth: .5,
                    borderColor: '#4b0082',
                    areaColor: "#fff",
                  }
                },

              }
            ]

          };
          //用$echarts是因为上面注册使用的 Vue.prototype.$echarts
          let mapChart = this.echarts.init(document.getElementById('mapChart'));
          mapChart.setOption(mapOption);

        },

        bStyle(index) {
          if (index == 0) {return { color: '#c7310f'}}
          else if (index == 1) {return { color: '#f3c525'}}
          else if (index == 2) {return { color: '#25cef3'}}

        }
      }
    }
</script>

<style lang="scss" scoped="">
  .container{
    background-color: rgba(1, 1, 61, 0.96);
    width: 100%;
    .head{
      width: 100%;
      h1{
        margin: 0;
        color: #ffffff;
        font-size: 25px;
        line-height: 56px;
      }
    }
    .content{
      display: flex;
      flex-direction: row;
      width: 98%;
      margin-left: 1%;
      background-color: #22284a;
      padding-bottom: 20px;
      .left{
        width: 32%;
        margin:0 0 0 1%;
        .leftBox{
          border-radius: 8px;
          width: 100%;
          height: 640px;
          background-color: #181c41;
          margin-top: 10px;
          .head{
            width: 100%;
            h2{
              margin: 0;
              color: #ffffff;
              font-size: 20px;
              line-height: 56px;
            }
          }
          .toplist{
            ul{
              margin-top: 10px;
              list-style: none;
              display: flex;
              flex-direction: row;
              width: 100%;
              li{
                width: 15%;
                height: 25px;
                margin-left: 13.5%;
                background-color: #22284a;
                border-radius: 6px;
                line-height: 25px;
                color: #ffffff;
              }
            }
          }
          .text{
            width: 100%;
            ul{
              width: 80%;
              margin-left: 5%;
              list-style: none;
              display: flex;
              flex-direction: row;
              li{
                line-height: 38px;
                font-size: 14px;
                color: #ffffff;
              }
              li:last-child{
                width: 60%;
                text-align: left;
              }
            }
            .off {
              background-color: #24284b;
            }
          }
        }
      }
      .center{
        width: 43%;
        margin:0 0 0 1%;
        .current{
          margin-top: 10px;
          width: 100%;
          display: flex;
          flex-direction: row;
          ul{
            border-radius: 8px;
            margin-left: 2%;
            list-style: none;
            width: 30%;
            height: 80px;
            background-color: #181c41;
            font-family: "Arial Black";
            li:first-child{
              line-height: 50px;
              font-size: 10px;
              color:green;
            }
            li:last-child{
              color:#ffffff;
              line-height: 0;
              font-size: 20px;
            }
          }
        }
      }
      .right{
        width: 26%;
        margin:0 1% 0 0;
        .rightBox{
          margin-top: 10px;
          border-radius: 8px;
          width: 100%;
          height: 440px;
          background-color: #181c41;
          margin-top: 10px;
          .head{
            width: 100%;
            h2{
              margin: 0;
              color: #ffffff;
              font-size: 20px;
              line-height: 56px;
            }
          }
          .tooltip{
            display: flex;
            flex-direction: row;
            width: 96%;
            margin-left: 2%;
            ul{
              display: flex;
              flex-direction: row;
              list-style: none;
              width: 35%;
              li:first-child{
                margin-left: 10%;
                width: 25%;
                height: 10px;
                border-radius: 5px;
              }
              li:last-child{
                margin-left: 5%;
                line-height: 10px;
                color:#ffffff;
                font-size: 13px;
              }
            }
          }
          p{
            float: left;
            margin-left: 6%;
            color: #ffffff;
            font-size: 15px;
            letter-spacing: 1px;
          }
        }
      }
    }
  }
</style>
             
