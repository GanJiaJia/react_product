import React , { Component } from 'react';
import { connect  } from 'react-redux';
import { Redirect} from 'react-router-dom';

class Write extends Component{
    render(){
        const { login } = this.props;
        if(!login){
            return (
                <Redirect  to="/login"/>
            )
        }else{
            return(
                <div>写文章</div>
            )
        }
        
    }
}
const mapState = (state)=>{
    return {
        login: state.getIn(['login', 'login'])
    }
}
export  default connect(mapState,null)(Write);