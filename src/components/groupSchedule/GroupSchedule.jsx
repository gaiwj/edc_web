import React from 'react';
import ReactDOM from 'react-dom';
import "./GroupSchedule.scss";
class GroupSchedule extends React.Component{
    constructor(props){
		super(props);
		this.state = {
            data:[],
            planGroup:[30, 20, 40, 21, 32, 21, 25],
            ActualGroup:[],
            month:[],
		}
		
	}
    render(){
        var list = [],
            Pg = this.state.planGroup;
        Array.isArray(this.state.data)?this.state.data.forEach(function(v,i){
            list.push(<li key={i}><span className="color-blue">{v.month}</span><span>{Pg[i]}</span><span>{v.groupNum}</span></li>)
        }):list=<li>暂无数据</li>;
        return <div>
                    <div id="container" className="group"></div>
                    <ul className="g-list">
                        <li><span className="color-blue">月度</span><span>计划入组人数</span><span>实际入组人数</span></li>
                        {list}
                    </ul>
                </div>
    }
    componentDidMount(){
        var _this = this;
        $.ajax({
            url:"/RUIJIESIYUAN/GetGroupProgressList",
            type:'POST',
            dataType:"json",
            success(data){
                if(data.Code===0){
                    var Ag = [],
                    month = [];
                    var pList = data.Body.GroupProgressListItems,data;
                    Array.isArray(pList)?pList.forEach(function(v,i){
                        Ag.push(v.groupNum);
                        month.push(v.month);
                    }):undefined;
                    _this.setState({
                        ActualGroup:Ag,
                        month:month,
                        data:pList
                    });
                    start();
                }else{
                    window.location.href="login.html";
                }
                
            }
        });    
        function start(){
            $(function () {
                $('#container').highcharts({
                    chart: {
                        type: 'area',
                        height:240,
                    },
                    title: {
                        text: '受试者人数',
                        align: 'left',
                        x: 0,
                        y:15,
                        style:{
                            fontSize:"0.4rem",
                            color:"#999999",
                        }
                    },
                    xAxis: {
                        categories: _this.state.month
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    // 图例
                    legend: {
                        align: 'right',
                        verticalAlign: 'top',
                        x: 0,
                        y: 0,
                        itemStyle: {
                            color: '#999999',   
                        },
                        squareSymbol:true,
                    },
                    plotOptions: {
                        line: {
                            enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                        },
                    },
                    colors:['#F5D17E','#ABD1F2'],
                    //去除水印
                    credits: {
                        enabled:false
                    },
                    //去除打印按钮
                    exporting: {
                        enabled:false
                    },
                    series: [{
                        name: '入组计划',
                        data: _this.state.planGroup,
                        marker: {
                            symbol: 'circle'
                        }
                    },{
                        name:'实际入组',
                        data:_this.state.ActualGroup,
                        marker: {
                            symbol: 'circle'
                        }
                    }],
                });
            });
        }
        
    }
}
export default GroupSchedule;