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
            _this = this;
        this.state.hospitals.forEach(function(v,i) {
            hospitalList.push(<option key={i} value={_this.state.hospitalID[i]}>{v}</option> )
        });
        !Array.isArray(this.state.data)?list=<li>暂无数据！</li>:this.state.data.forEach((v,i)=>{
            list.push(<li key={i}>
                            <span className="color-blue">{v.Code}</span>
                            <span>{v.SEX}</span>
                            <span>{v['受试者随机号']}</span>
                            <span>{v.zhiqingtongyi}</span>
                            <span>{v.PatientStatus}</span>
                        </li>)
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
                    </ul>
                </div>
    }
    componentDidMount(){
        var _this   = this,
            iSelect = document.querySelector('.su-select');
        getData(iSelect.options[iSelect.selectedIndex].value);
        iSelect.onchange=function(){
            var id = this.options[this.selectedIndex].value;
            getData(id);
        }
        function getData(id){
            $.ajax({
                url:"/RUIJIESIYUAN/GetPatientList",
                type:'POST',
                dataType:"json",
                data:{
                    IdHospital: id,
                    PageIndex: 1,
                    PageSize: 3
                },
                success(data){
                    console.log(data);
                    if(data.Code===0){
                        _this.setState({
                            data:data.Body.PatientByHospitalListItems,
                        })
                    }else{
                        
                    }
                }    
            });
        }
    }
}
export default SubjectsList;