import { fromJS } from 'immutable';
import  * as types  from './actionTypes';

const defaultState = fromJS({
    login: false
});
// console.log(defaultState);

export default (state = defaultState, action)=>{

    switch (action.type) {
        case types.CHANGE_LOGIN: 
            return state.set('login', action.value);
        default:
            break;
    }
    return state
}