import React from 'react';
import ReactDOM from 'react-dom';

import "./CentraList.scss";
class CentraList extends React.Component{
    constructor(props){
		super(props);
		this.state = {
            data:[],
            treeData:[]
        }	
	}    
    render(){
        var list = [];
        this.state.data.forEach(function(v,i){
            list.push(<li key={i}><span className="color-blue">{v.Code}</span><span>{v.HospitalName}</span><span>{v.PatientNum}</span></li>)
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
        $.ajax({
            url:"/RUIJIESIYUAN/GetSiteList",
            type:'POST',
            dataType:"json",
            success(data){
                if(data.Code===0){
                    var temp = [];
                    data.Body.SiteListItems.forEach(function(v,i){
                        temp[i]=[v.HospitalName,v.PatientNum];
                    });
                    _this.setState({
                        data:data.Body.SiteListItems,
                        treeData:temp
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
                        type: 'column',
                        height:240,
                    },
                    title: {
                        text: '受试者数量'
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
                    // tooltip: {
                    //     pointFormat: '人口总量: <b>{point.y:.1f} 百万</b>'
                    // },
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
                        data: _this.state.treeData,
                        dataLabels: {
                            enabled: true,
                        }
                    }]
                });
            });
        }
    }
}

export default CentraList;