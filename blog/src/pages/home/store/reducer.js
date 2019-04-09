// import * as types  from './actionTypes';
import { fromJS } from 'immutable';
import * as types from './actionTypes';
const defaultState = fromJS({
    topicList : [],
    articleList: [],
    recommendList : [],
    articlePage : 1,
    showScroll : true

});
// console.log(defaultState);

export default (state = defaultState, action)=>{
    // const newState = JSON.parse(JSON.stringify(state));
    // console.log(state);
    // console.log(newState);
    switch (action.type) {
        case types.CHANGE_HOMEDATA:
            return state.merge({
                topicList: action.topicList,
                articleList: action.articleList,
                recommendList: action.recommendList
            });
        case types.LOADMORE:
            return state.merge({
                articleList : state.get('articleList').concat(action.list),
                articlePage : action.page
            })
        case types.CHANGE_SCROLLTOP: 
            return state.set('showScroll' , action.flag);
            // state.set('articleList', state.get('articleList').concat(action.list));
            // return{}
        default:
            break;
    }
    return state
}