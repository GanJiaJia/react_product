import  * as types from './actionTypes'; 
import axios from 'axios';
import { fromJS } from 'immutable';

const search_list_action = (list)=>{
    return{
        type : types.SEARCH_LIST_TYPE,
        list : fromJS(list),
        totalPage : Math.ceil(list.length / 10)
    }
}

export const focus_action = (value)=>{
    return{
        type : types.FOCUS_TYPE,
        value
    }
}

export const mouseEnter_action = ()=>{
    return{
        type: types.MOUSE_ENTER_TYPE
    }
}
export const mouseLeave_action = ()=>{
    return{
        type: types.MOUSE_LEAVE_TYPE
    }
}
export const change_page_action = (page)=>{
    return{
        type: types.CHANGE_PAGE_TYPE,
        page
    }
}
// export const blur_action = ()=>{
//     return{
//         type : BLUR_TYPE,
//     }
// }


export const getList = ()=>{
    return (dispatch)=>{
        axios.get('/api/headerList.json').then((res)=>{
            if(res.data.success){
                const action = search_list_action(res.data.data);
                dispatch(action);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
}