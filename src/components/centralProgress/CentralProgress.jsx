import React from 'react';
import ReactDOM from 'react-dom';
import "./CentralProgress.scss";
class CentralProgress extends React.Component{
    constructor(props){
		super(props);
		this.state = {
            hospitals:JSON.parse(localStorage.getItem('hospitals')).map((v)=>v.Name),
            hospitalID:JSON.parse(localStorage.getItem('hospitals')).map((v)=>v.Id),
            data:[]
            // data:[{
            //         name: 'Firefox',
            //         y: 42.8,
            //         sliced: true,
            //         selected: true
            //         },
            //     ]
        }	
	}  
    render(){
        var hospitalList = [],
            _this = this;
        this.state.hospitals.forEach(function(v,i) {
            hospitalList.push(<option key={i} value={_this.state.hospitalID[i]}>{v}</option> )
        });
        var list = [];
        this.state.data.forEach((v,i)=>{
            list.push(<li key={i}><span className="color-blue">{v.name}</span><span>{v.y}</span></li>)
        });
        return <div>
                    <div>
                        <select name="" id="" className="c-select">
                            {hospitalList}
                        </select>
                    </div>
                    <div id="container" className="centra"></div>
                    <ul className="cp-list">
                        <li><span className="color-blue">受试者状态</span><span>受试者数量</span></li>
                        {list}
                    </ul>
                </div>
    }
    componentDidMount(){
        var _this = this,
            iSelect = document.querySelector('.c-select');
        getData(iSelect.options[iSelect.selectedIndex].value);
        iSelect.onchange=function(){
            var id = this.options[this.selectedIndex].value;
            getData(id);
        }
        function getData(id){
            $.ajax({
                url:"/RUIJIESIYUAN/GetSiteProgressList",
                type:'POST',
                dataType:"json",
                data:{
                    IdHospital:id
                },
                success(data){
                    if(data.Code===0){
                        var temp = []
                        data.Body.SiteProgressListItems.forEach(function(v,i){
                            temp.push({name:v.statusName,y:v.patientNum});
                        });
                        _this.setState({data:temp})
                        start();
                    }else{
                        window.location.href="login.html";
                    }
                }    
            });
        }
        function start(){
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
                        data: _this.state.data
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
}
export default CentralProgress;