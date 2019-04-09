import * as types  from './actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    focus : false,
    searchList : [],
    page: 1,
    totalPage : 1,
    mouseIn : false
});
// console.log(defaultState);

export default (state = defaultState, action)=>{
    // const newState = JSON.parse(JSON.stringify(state));
    // console.log(state);
    // console.log(newState);
    switch (action.type) {
        case types.FOCUS_TYPE:
            return state.set('focus', action.value);
            // newState.focus = action.value;
        case types.SEARCH_LIST_TYPE:
            // return state.set('searchList', action.list).set('totalPage', action.totalPage);
            return state.merge({
                searchList : action.list,
                totalPage: action.totalPage
            })
            // case BLUR_TYPE:
        //     return{
        //         focus : false
        //     }
        case types.MOUSE_ENTER_TYPE:
            return state.set('mouseIn', true);
        case types.MOUSE_LEAVE_TYPE:
            return state.set('mouseIn', false);
        case types.CHANGE_PAGE_TYPE:
            return state.set('page', action.page);
        default:
            break;
    }
    return state
}