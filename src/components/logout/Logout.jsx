import React from 'react';
import ReactDOM from 'react-dom';

import './Logout.scss';
        //console
class Logout extends React.Component{
    render(){
        return (<div>
                    <div className="logout">      
                        退出
                    </div>
                    <div className="def-box">
                        <p>确定退出?</p>
                        <button className="left-but">确定</button>
                        <button className="right-but">取消</button>
                    </div>
                </div>);
        
    }
    componentDidMount(){
        var defBox = document.querySelector('.def-box');
        document.querySelector('.logout').onclick=function(){
            defBox.style.display = "block";
        };
        document.querySelector('.left-but').onclick=function(){
            (function delAllCookie(){    
                var myDate=new Date();    
                myDate.setTime(-1000);//设置时间    
                var data=document.cookie;    
                var dataArray=data.split("; ");    
                for(var i=0;i<dataArray.length;i++){    
                    var varName=dataArray[i].split("=");    
                    document.cookie=varName[0]+"=''; expires="+myDate.toGMTString();    
                }                  
            })();
            defBox.style.display = "none";
            $.ajax({
                url:"/User/LoginOut",
                type:'GET',
                dataType:"json",
                success(data){
                    
                }
            });
            window.location.href="login.html";
        }
        document.querySelector('.right-but').onclick=function(){
            defBox.style.display = "none";
        }
    }
} 
export default Logout;