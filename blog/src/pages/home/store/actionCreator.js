import axios from 'axios'
import * as types from './actionTypes';
import { fromJS } from 'immutable';

const change_homeData_action = (result)=>{
    return{ 
        type: types.CHANGE_HOMEDATA,
        topicList : fromJS(result.topicList),
        articleList : fromJS(result.articleList),
        recommendList : fromJS(result.recommendList)
    }
}

const loadMore_action = (list,page)=>{
    return{
        type : types.LOADMORE,
        list : fromJS(list),
        page
    }
}
export const toggleTopShow_action = (flag)=>{
    return{
        type: types.CHANGE_SCROLLTOP,
        flag
    }
}

export const get_homeData_action  = ()=>{
    return (dispatch)=>{
        axios.get('/api/home.json').then((res)=>{
            if(res.data.success){
                dispatch(change_homeData_action(res.data.data))
            }else{
                console.log(res.data);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
}

export const load_more_action = (page)=>{
    return (dispatch)=>{
        axios.get('/api/homeList.json?page=' + page).then((res)=>{
            if(res.data.success){
                dispatch(loadMore_action(res.data.data, page+1))
            }else{
                console.log(res.data);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
}
