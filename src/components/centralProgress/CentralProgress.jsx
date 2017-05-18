import React from 'react';
import ReactDOM from 'react-dom';
import "./CentralProgress.scss";
class CentralProgress extends React.Component{
    constructor(props){
		super(props);
		this.state = {
            hospitals:JSON.parse(localStorage.getItem('hospitals')).map((v)=>v.Name),
            hospitalID:JSON.parse(localStorage.getItem('hospitals')).map((v)=>v.Id),
            num:[],
            data:[]
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
            list.push(<li key={i}><span className="color-blue">{v.name}</span><span>{_this.state.num[i]}</span></li>)
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
                        var temp = [],
                            numTemp=[];
                        data.Body.SiteProgressListItems.forEach(function(v,i,arr){
                            var per = v.patientNum/arr.reduce(function(previous,current){
                                return previous+current.patientNum;
                            },0)*100;
                            numTemp.push(v.patientNum);
                            temp.push({name:v.statusName,y:per});
                        });
                        _this.setState({data:temp,num:numTemp});
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
                    legend: {
                        align: 'left',
                        verticalAlign: 'top',
                        x: 0,
                        y: -10,
                        itemStyle: {
                            color: '#999999',   
                        }
                    },
                    plotOptions:{  
                        pie: {  
                            allowPointSelect: true, //选中某块区域是否允许分离  
                            cursor: 'pointer',  
                            dataLabels: {  
								distance:15,
								formatter:function(){
									return this.y+'%';
								},
								enabled:true,
								style:{
									fontSize:15,
									color:'#999999'
								}
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