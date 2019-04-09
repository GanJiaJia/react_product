import React, { Component } from 'react';
import { DetailWrapper, Header, Content } from './style';
import { connect } from 'react-redux';
import { actions } from './store';
import { withRouter   } from 'react-router-dom';
class Detail extends Component{
    componentWillMount(){
        window.scrollTo(0,0);
    }
    componentDidMount(){
        this.props.getDetail(this.props.match.params.id);
    }
    render(){
        const { title, content}  = this.props;
        return(
            <DetailWrapper>
                <Header>{ title }</Header>
                <Content dangerouslySetInnerHTML={{ __html : content }} />
            </DetailWrapper>
        )
    }
}
const mapState = (state)=>{
    return{
        title : state.getIn(['detail', 'title']),
        content : state.getIn(['detail', 'content']),
    }
}
const mapDispatch = ( dispatch )=>{
    return {
        getDetail(id){
            dispatch(actions.get_detail_action(id))
        }
    }
}
export default connect(mapState, mapDispatch)(withRouter(Detail)); 