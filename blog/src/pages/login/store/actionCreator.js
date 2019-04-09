import axios from 'axios'
import * as types from './actionTypes';
export const change_login_action = (bool)=>{
    
    return{
        type: types.CHANGE_LOGIN,
        value : bool
    }
} 
export const login_action = (account,password)=>{
    return(dispach)=>{
        axios.get('/api/login.json?account=' + account +'&password' + password).then((res)=>{
            if(res.data.success){
                console.log('登陆成功');
                dispach(change_login_action(true));
            }else{
                console.log('登陆失败！');
                dispach(change_login_action(false));
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
}