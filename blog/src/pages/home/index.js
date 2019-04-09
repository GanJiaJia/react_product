import React, { PureComponent } from 'react';
// PureComponent 依赖immutable.js
import { 
	HomeWrapper,
	HomeLeft,
	HomeRight
} from './style';
import Topic from './components/Topic';
import List from './components/List';
import Recommend from './components/Recommend';
import Writer from './components/Writer';
import { actions } from './store';
import { connect } from 'react-redux';
import { BackTop } from './style';
class Home extends PureComponent{
	
	constructor(props){
		super(props);
		this.handleScrollTop = this.handleScrollTop.bind(this);
	}
	render(){
        return(
            <HomeWrapper>
                <HomeLeft>
					<img className='banner-img' alt='' src="https://upload.jianshu.io/admin_banners/web_images/4642/c6beed73f461bcfc869721a35c7c6eee32137740.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" />
					<Topic />
					<List />
				</HomeLeft>

				<HomeRight>
					<Recommend />
					<Writer />
				</HomeRight>
				{ this.props.showScroll ? <BackTop onClick={ this.handleScrollTop}></BackTop> : null}
				
            </HomeWrapper>
		)		
	}
	componentDidMount(){
		this.props.get_homeData()
		this.bindEvents();
	}
	componentUnMount(){
		this.removeEvents();
	}
	handleScrollTop(){
		window.scrollTo(0,0);
	}	
	bindEvents(){
		window.addEventListener('scroll', this.props.shangeScrollTopShow)
	}
	removeEvents(){
		window.removeEventListener('scroll', this.props.shangeScrollTopShow)
	}
}

const mapState = (state)=>{
	return{
		showScroll: state.getIn(['home', 'showScroll'])
	}
}
const mapDispatch = (dispatch)=>{
	return{
		get_homeData(){
			dispatch(actions.get_homeData_action())
		},
		shangeScrollTopShow(e){
			if(document.documentElement.scrollTop > 50 ){
				dispatch(actions.toggleTopShow_action(true))
			}else{
				dispatch(actions.toggleTopShow_action(false));
			}
		}
	}
}
export default connect(mapState, mapDispatch)(Home)