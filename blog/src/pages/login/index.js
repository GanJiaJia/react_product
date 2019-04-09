import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginWrapper, LoginBox, Input, Button } from './style';
import  { actions } from './store';
import { Redirect } from 'react-router-dom';
class Detail extends Component{
    componentWillMount(){
    }
    componentDidMount(){
    }
    render(){
        const { login , login_fn } = this.props;
        console.log(login);
        if(!login){
            return(
                <LoginWrapper>
					<LoginBox>
						<Input placeholder='账号' ref={(input)=>{ this.account = input }}/>
						<Input placeholder='密码' type='password' ref={(input)=>{this.password = input }}/>
						<Button onClick={ ()=>{login_fn(this.account, this.password)} }>登陆</Button>
					</LoginBox>
				</LoginWrapper>
            )
        }else{
            return <Redirect to="/"/>
        }
        
    }
}
const mapState = (state)=>{
    return{
        login: state.getIn(['login', 'login'])
    }
}
const mapDispatch = ( dispach )=>{
    return {
        login_fn(account, password){
            dispach(actions.login_action(account.value,  password.value));
       }
    }
}
export default connect(mapState, mapDispatch)(Detail) 