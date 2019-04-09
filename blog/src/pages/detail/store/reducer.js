import { fromJS } from 'immutable';
import * as types from './actionTypes';
const defaultState = fromJS({
    title : null,
    contnet : null
});
// console.log(defaultState);

export default (state = defaultState, action)=>{

    switch (action.type) {
        case types.CHANGE_DETAIL_TYPE: 
            return state.merge({
                title: action.title,
                content : action.content
            });
            
        default:
            break;
    }
    return state
}