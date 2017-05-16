import React from 'react';
import ReactDOM from 'react-dom';
import "./GroupSchedule.scss";
class GroupSchedule extends React.Component{
    constructor(props){
		super(props);
		this.state = {
			data:[{
                    name: '计划入组人数',
                    data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }, {
                    name: '实际入组人数',
                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }],
            month:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
		}
		
	}
    render(){
        var tempList = [],
            list=[];
        this.state.month.forEach(function(v,i){
            if(!Array.isArray(tempList[i])){
                tempList[i]=[];
            }
            tempList[i].push(v);
        });
        this.state.data[0].data.forEach(function(v,i){
            if(!Array.isArray(tempList[i])){
                tempList[i]=[];
            }
            tempList[i].push(v);
        });
        this.state.data[1].data.forEach(function(v,i){
            if(!Array.isArray(tempList[i])){
                tempList[i]=[];
            }
            tempList[i].push(v);
        });
        tempList.forEach(function(v,i){
            list.push(<li key={i}><span className="color-blue">{v[0]}</span><span>{v[1]}</span><span>{v[2]}</span></li>);
        })
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
        $(function () {
            $('#container').highcharts({
                chart: {
                    type: 'line'
                },
                title: {
                    text: '月平均气温',
                    align: 'left',
                    x: 0
                },
                xAxis: {
                    categories: _this.state.month
                },
                yAxis: {
                    title: {
                        text: null
                    }
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    x: 0,
                    y: 0
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true          // 开启数据标签
                        },
                        enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                    }
                },
                series: _this.state.data
            });
        });
    }
}
export default GroupSchedule;