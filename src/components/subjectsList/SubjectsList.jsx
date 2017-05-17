import React from 'react';
import ReactDOM from 'react-dom';
import "./SubjectsList.scss";
class SubjectsList extends React.Component{
    constructor(props){
		super(props);
		this.state = {
            
		}
		
	}
    render(){
        return <div>
                    <select name="" id="">
                        <option value="">湖北第一医院</option>
                        <option value="">湖北第二医院</option>
                    </select>
                    <ul className="s-list">
                        <li>
                            <span className="color-blue">编号</span>
                            <span>性别</span>
                            <span>随机号</span>
                            <span><p>组织标本和</p><p>血液采集时间</p></span>
                            <span>状态</span>
                        </li>
                    </ul>
                </div>
    }
}
export default SubjectsList;