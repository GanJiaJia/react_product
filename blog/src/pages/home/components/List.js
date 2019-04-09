import React, { PureComponent } from 'react'; 
import { ListItem, ListInfo , LoadMore} from '../style';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../store/actionCreator';
class List extends PureComponent{
    render(){
        const { list , getMoreList, page } = this.props;
        return(
            <div>   
                {
                    list.map((item)=>{
                        return(
                            <Link key={item.get('id') + '' + Math.random()} to={'/detail/' + item.get('id') }>
                                <ListItem >
                                    <img className="pic" alt="pic" src={item.get('imgUrl')} /> 
                                    <ListInfo>
                                        <h3 className="title">{ item.get('title')}</h3>
                                        <p className="desc"> {item.get('desc')}</p>
                                    </ListInfo>
                                </ListItem>
                            </Link>
                        )
                    })
                }
                <LoadMore onClick={ ()=>{ getMoreList(page) } }>阅读更多</LoadMore>
            </div>
           
        )
    }
}
const mapState = (state)=>{
    return{
        list : state.getIn(['home','articleList']),
        page: state.getIn(['home', 'articlePage'])
    }
}
const mapDispatch = (dispatch) =>{
    return{
        getMoreList(page){
            dispatch(actions.load_more_action(page));
        }
    }
}
export default connect(mapState, mapDispatch)(List)