import React from 'react';
import ReactDOM from 'react-dom';

import './Login.scss';

class Login extends React.Component{
    render(){
        return (<div className="login">      
                    <div className="login-title">Electronic Data Capture System</div>
                    <form>
                        <input type="text" className="username" placeholder="用户名"/>
                        <input type="text" className="password" placeholder="密码"/>
                        <button className="login-but">登录</button>
                    </form>
                </div>);
        
    }
} 
export default Login;