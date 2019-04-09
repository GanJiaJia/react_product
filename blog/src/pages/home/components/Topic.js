import React, { PureComponent } from 'react';
import { TopicWrapper, TopicItem } from '../style';
import { connect } from 'react-redux';
class Topic extends PureComponent{
    render(){
        const { list } = this.props;
        return(
           <TopicWrapper>
               {
                   list.map((item,i)=>{
                       return(
                        <TopicItem key={ item.get('id') }>
                            <img className="topic-pic"  alt="pic" src={item.get('imgUrl')}/>
                                {item.get('title')}
                        </TopicItem>
                       )
                   })
               }
               
           </TopicWrapper>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        list: state.getIn(['home', 'topicList']),
    }
}
// const mapDispatchToProps = (dispatch)=>{
//     return{
        
//     }
// }
export default connect(mapStateToProps, null)(Topic)