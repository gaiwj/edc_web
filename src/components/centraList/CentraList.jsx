import React from 'react';
import ReactDOM from 'react-dom';

import "./CentraList.scss";
class CentraList extends React.Component{
    constructor(props){
		super(props);
		this.state = {
            list:[
                ['上海', 24.25,"上海第一医院"],
                ['卡拉奇', 23.50,"上海第一医院"],
                ['北京', 21.51,"上海第二医院"],
                ['德里', 16.78,"人民医院"],
                ['拉各斯', 16.06,"北京医院"],
                ['天津', 15.20,"南京医院"],
                ['伊斯坦布尔', 14.16,"非洲医院"],
                ['上s海', 24.25,"上海第一医院"],
                ['卡s拉奇', 23.50,"上海第一医院"],
                ['北s京', 21.51,"上海第二医院"],
                ['德s里', 16.78,"人民医院"],
                ['拉s各斯', 16.06,"北京医院"],
                ['天s津', 15.20,"南京医院"],
                ['伊斯坦布大神尔', 14.16,"非大神洲医院"],
                
            ]
        }	
	}    
    render(){
        var list = [];
        this.state.list.forEach(function(v,i){
            list.push(<li key={i}><span className="color-blue">{i}</span><span>{v[0]}</span><span>{v[1]}</span></li>)
        });
        return <div>
                    <div id="container" className="centra"></div>
                    <ul className="c-list">
                        <li><span className="color-blue">中心编号</span><span>中心名称</span><span>受试者账号</span></li>
                        {list}
                    </ul>
                </div>
    }
    componentDidMount(){
        var _this = this;
        $(function () {
            $('#container').highcharts({
                chart: {
                    type: 'column',
                    height:240,
                },
                title: {
                    text: '全球各大城市人口排行'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: null
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '人口总量: <b>{point.y:.1f} 百万</b>'
                },
                 //去除水印
                credits: {
                    enabled:false
                },
                //去除打印按钮
                exporting: {
                    enabled:false
                },
                series: [{
                    name: '总人口',
                    data: _this.state.list,
                    dataLabels: {
                        enabled: true,
                    }
                }]
            });
        });
    }
}

export default CentraList;