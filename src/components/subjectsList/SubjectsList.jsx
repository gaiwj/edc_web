import React from 'react';
import ReactDOM from 'react-dom';
import "./SubjectsList.scss";
class SubjectsList extends React.Component{
    constructor(props){
		super(props);
		this.state = {
            hospitals:JSON.parse(localStorage.getItem('hospitals')).map((v)=>v.Name),
            hospitalID:JSON.parse(localStorage.getItem('hospitals')).map((v)=>v.Id),
            data:[]
		}
		
	}
    render(){
        var hospitalList = [],
            list = [],
            _this = this,
            more='';
        this.state.hospitals.forEach(function(v,i) {
            hospitalList.push(<option key={i} value={_this.state.hospitalID[i]}>{v}</option> )
        });
        !Array.isArray(this.state.data)?list=<li>暂无数据！</li>:this.state.data.forEach((v,i,arr)=>{
            list.push(<li key={i}>
                            <span className="color-blue">{v.Code}</span>
                            <span>{v.SEX}</span>
                            <span>{v['受试者随机号']}</span>
                            <span>{v.zhiqingtongyi}</span>
                            <span>{v.PatientStatus}</span>
                        </li>);
            more = arr.length>=10?<button className="more">获取更多</button>:'';
        });
        return <div>
                    <select name="" id="" className="su-select">
                        {hospitalList}
                    </select>
                    <ul className="s-list">
                        <li>
                            <span className="color-blue">编号</span>
                            <span>性别</span>
                            <span>随机号</span>
                            <span><p>组织标本和</p><p>血液采集时间</p></span>
                            <span>状态</span>
                        </li>
                        {list}
                        <li id="more">{more}</li>
                    </ul>
                </div>
    }
    componentDidMount(){
        var _this   = this,
            iSelect = document.querySelector('.su-select');
        getData(iSelect.options[iSelect.selectedIndex].value);
        iSelect.onchange=function(){
            var id = this.options[this.selectedIndex].value;
            _this.state.data=[];
            getData(id);
        }
        document.getElementById('more').onclick=function(ev){
            ev.target.innerHTML = "正在获取...";
            ev.target.style.color = "#999999";
            ev.target.disabled = true;
            getData(iSelect.options[iSelect.selectedIndex].value,function(){
                ev.target.innerHTML = "获取更多";
                ev.target.style.color = "#3291FF";
                ev.target.disabled = false;
            },function(){
                ev.target.innerHTML = "没有更多数据了~";
                ev.target.style.color = "#999999";
                ev.target.disabled = true;
            });
        };      
        function getData(id,fun1,fun2){
            $.ajax({
                url:"/RUIJIESIYUAN/GetPatientList",
                type:'POST',
                dataType:"json",
                data:{
                    IdHospital: id,
                    PageIndex: Math.floor(_this.state.data.length/10),
                    PageSize: 10
                },
                success(data){
                    if(data.Code===0){
                        if(data.Body.PatientByHospitalListItems){
                            _this.setState({
                                data:[..._this.state.data,...data.Body.PatientByHospitalListItems],
                            })
                            fun1?fun1():'';
                        }else{
                            fun2?fun2():'';
                        } 
                    }else{
                       
                    }
                }    
            });
        }
    }
}
export default SubjectsList;