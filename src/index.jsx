import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,Link,hashHistory,IndexRoute} from 'react-router';

import Header from './components/header/Header.jsx';
import CentraList from  './components/centraList/CentraList.jsx';
import CentralProgress from  './components/centralProgress/CentralProgress.jsx';
import GroupSchedule from  './components/groupSchedule/GroupSchedule.jsx';
import SubjectsList from  './components/subjectsList/SubjectsList.jsx';
import Login from './components/login/Login.jsx';
import './style/common.scss';
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            routerName : 'groupSchedule',
        }
    }
    render(){
        return <div className="app">
                  <Header/>
                  <ul className="projectList">
                      <li><a href="#/groupSchedule" className={this.state.routerName=='groupSchedule'||this.state.routerName==''?'current':''}>入组进度表</a></li>
                      <li><a href="#/centraList" className={this.state.routerName=='centraList'?'current':''}>中心列表</a></li>
                      <li><a href="#/centralProgress" className={this.state.routerName=='centralProgress'?'current':''}>中心进度表</a></li>
                      <li><a href="#/subjectsList" className={this.state.routerName=='subjectsList'?'current':''}>受试者列表</a></li>  
                  </ul>
                  <div className="content">
                    {this.props.children}
                  </div>
               </div>
    }
    componentDidMount(){
        var _this = this;
		this.setState({
			routerName:location.hash.substr(2).split('/')[0],
		});
        window.addEventListener('hashchange',function(){
            _this.setState({
				routerName:location.hash.substr(2).split('/')[0],
			});
        })
    }
}
ReactDOM.render(<Router history = {hashHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={GroupSchedule}></IndexRoute>
                        <Route path="groupSchedule" component={GroupSchedule}></Route>
                        <Route path="centraList" component={CentraList}></Route>
                        <Route path="centralProgress" component={CentralProgress}></Route>
                        <Route path="subjectsList" component={SubjectsList}></Route>
                    </Route>
                </Router>,document.getElementById('app'));
//ReactDOM.render(<Login/>,document.getElementById('app'))
//使用rem布局监听窗口大小变化
var width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
var docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
        let wid = docEl.clientWidth;
        if(wid>=540){
        	docEl.style.fontSize = 54+'px';
        }else{
        	docEl.style.fontSize = wid/10 + 'px';
        }
    };
window.addEventListener(resizeEvt, recalc, false);
document.addEventListener('DOMContentLoaded', recalc, false);