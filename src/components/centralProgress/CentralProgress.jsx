import React from 'react';
import ReactDOM from 'react-dom';
import "./CentralProgress.scss";
class CentralProgress extends React.Component{
    constructor(props){
		super(props);
		this.state = {
            
        }	
	}  
    render(){
        return <div>
                    <div>
                        <select name="" id="" className="c-select">
                            <option value="">湖南医院</option> 
                            <option value="">上海医院</option>
                        </select>
                    </div>
                    <div id="container" className="centra"></div>
                    
                </div>
    }
    componentDidMount(){
        $(function () {
            $('#container').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    height:240
                },
                title: {
                    text: null
                },
                tooltip: {
                    headerFormat: '{series.name}<br>',
                    pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: '浏览器访问量占比',
                    data: [
                        {
                            name: 'Chrome',
                            y: 32.8,
                        },{
                            name: 'Safari',
                            y: 15,
                        },{
                            name: 'IE',
                            y: 12.2,
                        },{
                            name: 'Firefox',
                            y: 42.8,
                            sliced: true,
                            selected: true
                        },
                    ]
                }],
                 //去除水印
                credits: {
                    enabled:false
                },
                //去除打印按钮
                exporting: {
                    enabled:false
                },
            });
        });
    }
}
export default CentralProgress;