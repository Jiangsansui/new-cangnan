<template>
  <div class="container">
    <div class="content">
      <div class="head">
        <div class="texthead">
          <span>苍南县行政审批服务中心可视化平台</span>
        </div>
        <div class="time">
          <span class="time">{{nowTime}}</span>
        </div>
      </div>
      <div class="main">
        <div class="left">
          <!--          各镇(乡)预约人数统计-->
          <div class="leftBox">
            <div class="head">{{ titleList[active] }}预约人数统计</div>
            <ul>
              <li :class="tabs == 1 ? 'act' : ''" @click="handleTabs(1)" style="margin-top: 5%">日统计</li>
              <li :class="tabs == 2 ? 'act' : ''" @click="handleTabs(2)" style="margin-top: 5%">周统计</li>
              <li :class="tabs == 3 ? 'act' : ''" @click="handleTabs(3)" style="margin-top: 5%">月统计</li>
            </ul>

            <div id="myChart" :style="{height: '350px'}" ></div>

          </div>

          <!--          当日不同时间段窗口办理统计-->
          <div class="leftBox" v-if="active !== 1">
            <div class="head"> 当日不同时间段窗口办理统计</div>
            <div class="toplist">
            </div>
            <div id="myChartOne" :style="{height: '400px'}"></div>
          </div>
          <!--          热点事项办理统计TOP10 -->
          <div class="leftBox" v-if="active === 1">
            <div class="head">热点事项办理统计TOP10</div>
            <div class="text">
              <ul  v-for="(T,index) in num" :key="index"  :class="{off:index%2!=0}">
                <li :style="cStyle(index)">{{T.num}}</li>
                <li>{{T.event}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="center">
          <div class="current">
            <ul  v-for="(item,index) in list" :key="index">
              <li :style="aStyle(index)">{{item.event}}</li>
              <li>{{item.num}}</li>
            </ul>
          </div>
          <div class="picture" style="height: 700px">
            <img src="../assets/qiaodun.png" style="margin-left:-49.2%"/>
            <img src="../assets/qiaodun1.png" style="margin-left:-49.2%" v-if="active === 1"/>
            <div @click="handleActive(1)" class="text" style="top:27%; left: 28%"></div>

            <img src="../assets/lingxi.png" style="margin-left: -10.5%">
            <img src="../assets/lingxi1.png" style="margin-left: -10.5%" v-if="active === 2"/>
            <div @click="handleActive(2)" class="text" style="top:24%; left: 47.5%"></div>

            <img src="../assets/longgan.png" style="margin-top: 82px;margin-left: 15%">
            <img src="../assets/longgang1.png" style="margin-top: 82px;margin-left: 15%" v-if="active === 3"/>
            <div @click="handleActive(3)" class="text" style="top:17%; left: 79.5%"></div>

            <img src="../assets/yishan.png" style="margin-top: 148px;margin-left: 20.7%">
            <img src="../assets/yishan1.png" style="margin-top: 148px;margin-left:  20.7%" v-if="active === 4"/>
            <div @click="handleActive(4)" class="text" style="top:22%; left: 70.5%"></div>

            <img src="../assets/zaoxi.png" style="margin-top:178px;margin-left: 2.5%">
            <img src="../assets/zaoxin1.png" style="margin-top:178px;margin-left: 2.5%" v-if="active === 5"/>
            <div @click="handleActive(5)" class="text" style="top:33.5%; left: 57%"></div>

            <img src="../assets/qianku.png" style="margin-top:159px;margin-left: 16.8%">
            <img src="../assets/qianku1.png" style="margin-top:159px;margin-left:16.8%" v-if="active === 6"/>
            <div @click="handleActive(6)" class="text" style="top:31.5%; left:74%"></div>

            <img src="../assets/jinxiang.png" style="margin-top:200.5px;margin-left: 28.9%">
            <img src="../assets/jinxiang1.png" style="margin-top:200.5px;margin-left: 28.9%" v-if="active === 7"/>
            <div @click="handleActive(7)" class="text" style="top:38%; left: 86.5%"></div>

            <img src="../assets/fanshan.png" style="margin-top:268px;margin-left: -5%">
            <img src="../assets/fanshan1.png" style="margin-top:268px;margin-left: -5%" v-if="active === 8"/>
            <div @click="handleActive(8)" class="text" style="top:46%; left: 48.5%"></div>

            <img src="../assets/fengyang.png" style="margin-top:338px;margin-left:7%">
            <img src="../assets/fengyang1.png" style="margin-top:338px;margin-left:7%" v-if="active === 9"/>
            <div @click="handleActive(9)" class="text" style="width: 80px; top:51%; left: 57%"></div>

            <img src="../assets/chixi.png" style="margin-top:268px;margin-left: 13%">
            <img src="../assets/chixi1.png" style="margin-top:268px;margin-left: 13%" v-if="active === 10"/>
            <div @click="handleActive(10)" class="text" style="top:52%; left: 78.5%"></div>

            <img src="../assets/dailing.png" style="margin-top:394px;margin-left: -2%" >
            <img src="../assets/dailing1.png" style="margin-top:394px;margin-left: -2%" v-if="active === 11"/>
            <div @click="handleActive(11)" class="text" style="width: 80px; top:60%; left: 47.5%"></div>

            <img src="../assets/mazhan.png" style="margin-top:395px;margin-left: 2.9%">
            <img src="../assets/mazhan1.png" style="margin-top:395px;margin-left:  2.9%" v-if="active === 12"/>
            <div @click="handleActive(12)" class="text" style="top:67%; left: 65%"></div>
          </div>
          <div style="color:#fff;letter-spacing: 1px;margin-top: 20%">浙江清大科技有限公司 © 版权所有</div>
        </div>
        <div class="right">
          <!--            承诺件办结效能对比-->
          <div class="rightBox">
            <div class="head">承诺件办结效能对比</div>
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
            <div id="myChartFour" :style="{height: '380px'}"></div>
          </div>
          <div class="rightBox">
            <!--               满意度统计-->
            <div class="head">满意度统计</div>
            <p>评价人数:&nbsp;203人</p>
            <div id="myChartFive" :style="{height: '380px'}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        tabs:1,
        titleList: ['各镇(乡)', '桥墩镇','灵溪镇','宜山镇','藻溪镇','钱库镇','矾山镇','凤阳畲族乡','赤溪镇','岱岭畲族乡','马站镇'],
        // 热点事项办理统计TOP10
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
        // 各镇(乡)预约人数统计
        yyname:[],
        yyvalue:[],
        myChart: '',
        people: ['桥墩镇', '马站镇', '矾山镇', '龙港镇', '灵溪镇', '宜山镇', '藻溪镇', '凤阳畲族乡', '赤溪镇', '岱岭畲族乡', '钱库镇', '金乡镇'],
        peopleData: [1020, 932, 601, 934, 2290,110,250,230,12,34,567,123],
        // 当前预约/取号/办结总人数
        list:[
          {event:'当前预约总人数',num:''},
          {event:'当前取号总人数',num:''},
          {event:'当前办结总人数',num:''}
        ],
        // 当日不同时间段窗口办理统计
        myChartOne: '',
        name:[],
        active: 0,
        nowTime:'',
        dealList: [
          ['produce'], ['09:00'], ['10:00'], ['11:00'], ['12:00'],
          ['13:00'], ['14:00'], ['15:00'], ['16:00'], ['17:00'], ['18:00']
        ],
        dealBar: [],
        dealColor: [],
        // 满意度统计
        Satisfied:[]
      }
    },
    created(){
      //    当前预约/取号/办结总人数接口
      this.yyajax(1);
      this.$.ajax({
        url: 'http://10.10.10.149:9900/queue/GetQueueStatisticsData',
        data:{
          StaticType:6,
          AreaNo:''
        },success:(res)=>{
          res=JSON.parse(res)
          for(var i=0;i<3;i++){
            this.list[i].num=res.data[i].value;
          }
        }
      });
      //    当日判断
      var day2 = new Date();
      day2.setTime(day2.getTime());
      var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
      console.log(s2)
      //    满意度统计接口
      this.$.ajax({
        url: 'http://10.10.10.149:9900/queue/GetQueueStatisticsData',
        data:{
          StaticType:4,
          BeginDate:"2019-1-1",
          EndDate:s2},success:(res)=>{
          res=JSON.parse(res)
          this.Satisfied=res.data
          for(var i=0;i< this.Satisfied.length;i++){
            switch(this.Satisfied[i].name) {
              case "1":
                this.Satisfied[i].name="非常满意"
                break;
              case "2":
                this.Satisfied[i].name="基本满意"
                break;
              case "3":
                this.Satisfied[i].name="不满意"
                break;
              case "4":
                this.Satisfied[i].name="建议"
                break;
            }
          }
          this.drawFour();
        }});
    },
    mounted() {
      this.drawOne();
      this.drawThree();
      this.nowTimes();
      this.dealWith();
    },
    methods:{
      GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth()+1);//获取当前月份的日期，不足10补0
        var d = dd.getDate();//获取当前几号，不足10补0
        return y+"-"+m+"-"+d;
      },
      // 当日不同时间段窗口办理统计接口
      dealWith() {
        this.$.ajax({
          url: 'http://10.10.10.149:9900/queue/GetQueueStatisticsData',
          data: {
            StaticType: 8,
            BeginDate: "2019-1-1",
            EndDate: new Date().getFullYear()+"-" + (new Date().getMonth()+1) + "-" + new Date().getDate()
          }, success:(res)=>{
            console.log('【dealWith】', JSON.parse(res));
            let data = JSON.parse(res).data;
            this.dealList = [
              ['produce'], ['09:00'], ['10:00'], ['11:00'], ['12:00'],
              ['13:00'], ['14:00'], ['15:00'], ['16:00'], ['17:00'], ['18:00']
            ];
            this.dealBar = [];
            this.dealColor = [];
            for (let i in data) {
              if (this.dealList[0].indexOf(data[i].name) === -1) {
                this.dealList[0].push(data[i].name);
                this.dealBar.push({type: 'bar'});
                if (data[i].name === '民政局') {
                  this.dealColor.push('#25cef3');
                } else if (data[i].name === '卫计局') {
                  this.dealColor.push('#d01864');
                } else if (data[i].name === '社保局') {
                  this.dealColor.push('#f3c525');
                } else if (data[i].name === '人力资源局') {
                  this.dealColor.push('#c7310f');
                } else {
                  this.dealColor.push('#2cab65');
                }
              }
              if (data[i].xaxis === '09:00') {
                this.dealList[1].push(data[i].value);
              } else if (data[i].xaxis === '10:00') {
                this.dealList[2].push(data[i].value);
              } else if (data[i].xaxis === '11:00') {
                this.dealList[3].push(data[i].value);
              } else if (data[i].xaxis === '12:00') {
                this.dealList[4].push(data[i].value);
              } else if (data[i].xaxis === '13:00') {
                this.dealList[5].push(data[i].value);
              } else if (data[i].xaxis === '14:00') {
                this.dealList[6].push(data[i].value);
              } else if (data[i].xaxis === '15:00') {
                this.dealList[7].push(data[i].value);
              } else if (data[i].xaxis === '16:00') {
                this.dealList[8].push(data[i].value);
              }
            }
            this.drawTwo();
          }});
      },
      compare(property){
        return (a,b)=>{
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
        }
      },
      handleTabs(num) {
        this.tabs = num;
        this.yyajax(num);
      },
      handleActive(num) {
        var that = this;
        that.active = num;
        that.people = [];
        setTimeout(function () {
          that.drawOne();
          that.drawTwo();
        }, 0)
      },
      //各镇(乡)预约人数统计
      drawOne(){
        this.myChart = '';
        var dom = document.getElementById('myChart');
        this.myChart = this.echarts.init(dom);
        this.myChart.setOption({
          xAxis: {
            type: 'category',
            data: this.yyname,
            // 去除x轴上的刻度线
            axisTick: {show: false},
            //去掉x轴横轴
            axisLine: {show: false},
            axisLabel:{
              fontSize:'12',
              interval:0,
              color:"#fff",
              rotate:320
            },
          },
          yAxis: {
            type: 'value',
            // 去除x轴上的刻度线
            axisTick: {show: false},
            //去掉x轴横轴
            axisLine: {show: false},
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
              color:"#fff"
            },
          },
          series: [{
            symbolSize: 10,
            data: this.yyvalue,
            type: 'line',
            smooth: true,
            itemStyle:{
              normal:{
                borderColor: 'rgb(38,40,55)',
                borderWidth: 3,
              }
            },
            label: {
              show: true,
              formatter: (params)=>{
                let maxIndex = 0;
                for (let i in this.peopleData) {
                  maxIndex = this.peopleData[i] > this.peopleData[maxIndex] ? i : maxIndex;
                }
                return params.dataIndex == maxIndex ? params.data : '';
              },
              textStyle:{
                color:'#fff'
              }
            },
            lineStyle: {
              width:4,
              color: 'rgb(37,206,243)'
            },
          }]
        })
      },
      //    各镇（乡）预约人数统计接口请求
      yyajax(num){
        var dateend=this.GetDateStr(1);
        var datebegin;
        if(num==1){datebegin=this.GetDateStr(0);}
        else if(num==2){datebegin=this.GetDateStr(-7);}
        else {datebegin=this.GetDateStr(-30);}
        this.$.ajax({
          url: 'http://10.10.10.149:9900/queue/GetBookStatisticsData',
          data:{
            StaticType:4,
            BeginDate:datebegin,
            EndDate:dateend},success:(res)=>{
            res=JSON.parse(res)
            var data=res.data
            this.$.each(data,(i,item)=>{
              this.yyname.push(item.name);
              this.yyvalue.push(item.value);
            })
            console.log(this.yyname,this.yyvalue)
            this.drawOne();
          }});
      },
      drawTwo(){
        this.myChartOne = '';
        let dom = document.getElementById('myChartOne');
        this.myChartOne = this.echarts.init(dom);
        console.log('【dealList】', this.dealList);
        this.myChartOne.setOption({
          color: this.dealColor,
          legend: {
            textStyle: {
              color:'white'
            }
          },
          grid:{
            bottom:'5%'
          },
          tooltip: {
            // trigger: 'item',  //单独显示每条柱子得具体数据
            trigger: 'axis',
            textStyle: {
              align: 'left'
            }
          },
          dataset: {
            source: this.dealList
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              data: this.times,
              // 去除x轴上的刻度线
              axisTick: {
                show: false
              },
              //去掉x轴横轴
              axisLine: {
                show: false
              },
              axisLabel:{
                fontSize:'12',
                interval:0,
                color:"#fff"
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              // 去除y轴上的刻度线
              axisTick: {
                show: false
              },
              //去掉y轴横轴
              axisLine: {
                show: false
              },
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
                color:"#fff"
              }
            }
          ],
          series: this.dealBar
        });
      },
      // 承诺件办结效能对比
      drawThree(){
        var dom = document.getElementById('myChartFour')
        var myChartFour = this.echarts.init(dom)
        myChartFour.setOption({
          color: ['#25cef3', '#f3c525', '#2cab65'],
          title: {
            text: '工作日',
            left:'4%',
            top:'8%',
            textStyle:{
              color:'#fff',
              fontSize:'15',
              fontStyle:'lighter'
            }
          },
          tooltip: {
            trigger: 'axis',
            textStyle:{
              align:'left'
            }
          },
          grid: {
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            // 去除x轴上的刻度线
            axisTick: {
              show: false
            },
            //去掉x轴横轴
            axisLine: {
              show: false
            },
            axisLabel:{
              interval: 0,
              rotate:300,
              fontSize:'12',
              interval:0,
              color:"#fff"
            },
            boundaryGap: false,
            data: ['消防局', '发改委', '公安局', '人力资源局', '劳动局', '公安局', '劳动局']
          },
          yAxis: [
            {
              type: 'value',
              splitLine :{
                lineStyle:{
                  color:['#3d4263'],
                  type:'dashed'
                },
                show:true
              },
              // 去除y轴上的刻度线
              axisTick: {
                show: false
              },
              axisLabel:{
                interval:0,
                color:"#fff",
                lineStyle:{
                  color:'#3d4263',
                  type:'dashed'
                }
              }
            },
            {
              axisLine:{
                lineStyle:{
                  color:'#3d4263',
                  type:'dashed'
                }
              },
              type: 'value'
            }
          ],
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
      },
      // 满意度统计
      drawFour(){
        var dom = document.getElementById('myChartFive')
        var myChartFive = this.echarts.init(dom)
        myChartFive.setOption({
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['45%', '80%'],
              color:['#2cab65','#f3c525','#c7310f','#0a9bc7' ],
              //圆饼数据显示百分比
              label: {
                formatter: '{b}:{d}%',// {@2012}
                textStyle: {
                  color: '#fff'
                }
              },
              labelLine:{
                normal: {
                  lineStyle: {
                    color: '#fff'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                }
              },
              data:this.Satisfied
            }
          ]
        });
      },
      // 颜色样式定义
      aStyle(index) {
        if (index == 0) {return { color: 'green'}}
        else if (index == 1) {return { color: '#efc203'}}
        else if (index == 2) {return { color: 'red'}
        }
      },
      bStyle(index) {
        if (index == 0) {return { background: '#25cef3'}}
        else if (index == 1) {return { background: '#d01864'}}
        else if (index == 2) {return { background: '#f3c525'}}
        else if (index == 3) {return { background: '#c7310f'}}
        else if (index == 4) {return { background: '#2cab65'}}
      },
      cStyle(index) {
        if (index == 0) {return { color: '#c7310f'}}
        else if (index == 1) {return { color: '#f3c525'}}
        else if (index == 2) {return { color: '#25cef3'}}
      },
      // 获取当前时间函数
      timeFormate(timeStamp) {
        let year = new Date(timeStamp).getFullYear();
        let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
        let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
        let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
        let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
        let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
        this.nowTime = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm+':'+ss ;
      },
      // 定时器函数
      nowTimes(){
        this.timeFormate(new Date());
        setInterval(this.nowTimes,1000);
        this.clear()
      },
      clear(){
        clearInterval(this.nowTimes)
        this.nowTimes = null;
      }
    }
  }
</script>

<style lang="scss" scoped="">
  .container{
    background-color: rgba(1, 1, 61, 0.96);
    width: 100%;
    margin: 0;
    height: 100%;
    .content{
      width: 100%;
      height: 100%;
      .head{
        width: 100%;
        height: 5%;
        margin:0;
        .texthead{
          width: 100%;
          span{
            color: #ffffff;
            font-size: 25px;
            font-weight: bolder;
            line-height: 50px;
          }
        }
        .time{
          position: relative;
          span{
            position: absolute;
            margin-left: 40%;
            margin-top:-30px;
            color: #ffffff;
            letter-spacing: 1px;
          }
        }
      }
      .main{
        width: 98%;
        height: 93%;
        margin-left: 1%;
        background-color: #22284a;
        display: flex;
        flex-direction: row;
        .left{
          width: 32%;
          margin:0 0 0 1%;
          height: 100%;
          .leftBox {
            border-radius: 8px;
            width: 100%;
            height: 48%;
            margin-top: 2%;
            background-color: #181c41;
            .head{
              width: 100%;
              color: #ffffff;
              font-size: 25px;
              font-weight: bolder;
              line-height: 60px;
            }
            ul {
              width: 100%;
              list-style: none;
              display: flex;
              flex-direction: row;
              li {
                margin-left: 5%;
                border-radius: 10px;
                line-height: 38px;
                width: 20%;
                font-size: 15px;
                color: #ffffff;
              }
              .act{
                color: #ffffff;
                background-color: #329aff;
              }
            }
            .toplist{
              margin-top: 5%;
              width: 80%;
              margin-left: 10%;
              display: flex;
              flex-direction: row;
              span{
                margin-left: 4%;
                list-style: none;
                width: 15%;
                display: flex;
                flex-direction: column;
                li:first-child{
                  color: #ffffff;
                }
                li:last-child{
                  border-radius: 5px;
                  margin-top: 8px;
                  width:50%;
                  margin-left: 25%;
                  height: 8px;
                  background-color: red;
                }
              }
            }
            .text{
              width: 100%;
              margin-top: 5%;
              ul{
                margin-block-start: 0em;
                margin-block-end: 0em;
                padding-inline-start: 0px;
                width: 94%;
                margin-left: 3%;
                li{
                  line-height: 41px;
                }
                li:first-child{
                  width: 10%;
                  font-size: 14px;
                  color: #ffffff;
                }
                li:last-child{
                  width: 60%;
                }
              }
              .off {
                background-color: #24284b;
              }
            }
          }
        }
        .center {
          flex-direction: column;
          width: 38%;
          margin: 0 1% 0 1%;
          height: 100%;
          .current {
            width: 100%;
            display: flex;
            flex-direction: row;
            ul {
              border-radius: 8px;
              margin-left: 2%;
              list-style: none;
              width: 30%;
              height: 80px;
              background-color: #181c41;
              font-family: "Arial Black";
              li{
                margin-left: -20%;
              }
              li:first-child {
                line-height: 50px;
                font-size: 10px;
                color: green;
              }
              li:last-child {
                color: #ffffff;
                line-height: 0;
                font-size: 20px;
              }
            }
          }
          .picture{
            width: 100%;
            position: relative;
            img{
              position: absolute;
              margin-top: 100px;
            }
            .text {
              width: 50px;
              height: 20px;
              position: absolute;
              cursor: pointer;
              z-index: 1;
            }
          }
        }
      }
    }
    .right{
      width: 30%;
      margin:0 1% 0 0;
      height: 100%;
      .rightBox{
        margin-top: 10px;
        border-radius: 8px;
        width: 100%;
        height: 48%;
        background-color: #181c41;
        margin-top: 2%;
        .head{
          width: 100%;
          color: #ffffff;
          font-size: 25px;
          font-weight: bolder;
          line-height: 60px;
        }
        .tooltip{
          margin-top: 5%;
          display: flex;
          flex-direction: row;
          width: 100%;
          ul{
            display: flex;
            flex-direction: row;
            list-style: none;
            width: 40%;
            margin-left: -5%;
            li:first-child{
              margin-left: 10%;
              width:25%;
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
          margin-top: 8%;
          float: left;
          margin-left: 6%;
          color: #ffffff;
          font-size: 15px;
          letter-spacing: 1px;
        }
      }
    }
  }
</style>
