import axios from 'axios';
import { fromJS } from 'immutable';
import * as types from './actionTypes';
const change_detal_action = (result)=>{
    return{
        type: types.CHANGE_DETAIL_TYPE,
        title : fromJS(result.title),
        content : fromJS(result.content)
    }
}
export const get_detail_action = (id)=>{
    return (dispatch)=>{
        axios.get('/api/detail.json?id='+id).then((res)=>{
            if(res.data.success){
                const result = res.data.data;
                dispatch(change_detal_action(result));
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
}