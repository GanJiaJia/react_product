import React , { Component } from 'react';
import { HeaderWrapper, Logo , Nav , NavItem , NavSearch , Addition, Button, SearchWrap, SeacrInfo, SearchInfoList,SearchInfoItem, SearchTitle, SearchInfoSwitch} from './style';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions } from './store';
import { actions as loginActions } from '../../pages/login/store';
class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
           
        }
        // this.handleFocus = this.handleFocus.bind(this);
        // this.handleBlur = this.handleBlur.bind(this);
    }
    render(){
        const { focus, handleFocus , handleBlur,searchList , login , loginOut} = this.props;
        console.log(login);
        return(
            <HeaderWrapper>
                <Link to="/">
                    <Logo ></Logo>
                </Link>
                <Nav>
                    <Link to="/">
                         <NavItem className="left active">首页</NavItem>
                    </Link>
                    <NavItem className="left">下载App</NavItem>
                    { login ?

                    <NavItem onClick={ loginOut } className="right">退出</NavItem> : 

                    <Link to="/login">
                        <NavItem className="right">登陆</NavItem>
                    </Link>
                    }
                    <NavItem className="right"><span className="iconfont icon-Aa"></span></NavItem>
                    <SearchWrap>
                        <CSSTransition 
                            in={focus}
                            timeout={200}
                            classNames ="slide"
                        >
                            <NavSearch 
                                onFocus= { ()=>{ handleFocus(searchList) }}
                                onBlur = { handleBlur}
                                className={ focus ? 'focus' : ''}>
                            </NavSearch>
                            </CSSTransition>
                         <i  className={ focus ? 'focus iconfont icon-sousuo zoom' : 'iconfont icon-sousuo zoom'}></i>
                        { this.is_show_list() }
                    </SearchWrap>
                </Nav>
                <Addition> 
                    <Link to="/write"> 
                        <Button className="writting"><span className="iconfont icon-icon-pencil"></span> 写文章</Button>  
                    </Link>
                    <Button className="reg">注册</Button>  
                </Addition>
            </HeaderWrapper> 
        )
    }
    is_show_list(){
        const { searchList, focus, page , handleMouseEnter, handleMouseLeave, mouseIn, handleChangePage, totalPage} = this.props;
        const newList = searchList.toJS();
        const pageList = []; 
        if(newList.length){
            for(let i = (page-1) * 10 ; i < page * 10; i++){
                pageList.push(
                    <SearchInfoItem key={i}>{newList[i]}</SearchInfoItem>
                )
            }
        }
        if(mouseIn || focus){
            // console.log(mouseIn);
            return (
                <SeacrInfo 
                    onMouseLeave = {handleMouseLeave}
                    onMouseEnter = {handleMouseEnter}>
                    <SearchTitle>热门搜索
                        <SearchInfoSwitch onClick={()=>{ handleChangePage(page, totalPage , this.spinIcon) } }> 
                        <i ref = {(icon)=>{ this.spinIcon = icon }}className="iconfont spin">&#xe647;</i>
                        换一批 </SearchInfoSwitch>
                    </SearchTitle>
                    <SearchInfoList>
                        {/* { searchList.map((item,index)=>{
                            return(  <SearchInfoItem key={index}>{item}</SearchInfoItem> )
                        })} */}
                        {
                           pageList 
                        }
                    </SearchInfoList>
                </SeacrInfo>
            )
        }else {
            return null
        }
    }
    // handleFocus(){
    //     console.log(111);
    //     this.setState((prevState)=>{
    //         return{
    //             focus  : true
    //         }
    //     })
    // }
    // handleBlur(){
    //     this.setState((prevState)=>{
    //         return{
    //             focus : false
    //         }
    //     })
    // }
}


// export const Header = (props)=>{
//     const { focus, handleFocus , handleBlur} = props;
//     return(
//             <HeaderWrapper>
//                 <Logo ></Logo>
//                 <Nav>
//                     <NavItem className="left active">首页</NavItem>
//                     <NavItem className="left">下载App</NavItem>
//                     <NavItem className="right">登陆</NavItem>
//                     <NavItem className="right"><span className="iconfont icon-Aa"></span></NavItem>
//                     <SearchWrap>
//                         <CSSTransition 
//                             in={focus}
//                             timeout={200}
//                             classNames ="slide"
//                         >
//                             <NavSearch 
//                                 onFocus= { handleFocus}
//                                 onBlur = { handleBlur}
//                                 className={ focus ? 'focus' : ''}>
//                             </NavSearch>
//                             </CSSTransition>
//                          <i  className={ focus ? 'focus iconfont icon-sousuo' : 'iconfont icon-sousuo'}></i>
//                         { is_show_list(focus) }
//                     </SearchWrap>
//                 </Nav>
//                 <Addition> 
//                     <Button className="writting"><span className="iconfont icon-icon-pencil"></span> 写文章</Button>  
//                     <Button className="reg">注册</Button>  
//                 </Addition>
//             </HeaderWrapper> 
//     )
// }

const mapStateToProps = (state)=>{
    return {
        focus : state.getIn(['header', 'focus']),
        // focus : state.get('header').get('focus') //immutable数据类型
        // focus : state.header.'focus',
        searchList : state.getIn(['header', 'searchList']),
        page : state.getIn(['header', 'page']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        totalPage : state.getIn(['header' , 'totalPage']),
        login : state.getIn(['login','login'])
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        handleFocus(searchList){
            // console.log(searchList);
            searchList.size <= 0 && dispatch(actions.getList());
           
            const action = actions.focus_action(true);
            dispatch(action);
        },
        handleBlur(){
            // const action = blur_action();
            const action = actions.focus_action(false);
            dispatch(action);
        },
        handleMouseEnter(){
            const action = actions.mouseEnter_action();
            dispatch(action)
        },
        handleMouseLeave(){
            dispatch(actions.mouseLeave_action())
        },
        handleChangePage(page, totalPage , spin){
            let originAngel = Number(spin.style.transform.replace(/[^0-9]/ig, ''));
            spin.style.transform = 'rotate('+(originAngel+360)+'deg)';

            if(page < totalPage){
                dispatch(actions.change_page_action(page+1));
            }else{
                dispatch(actions.change_page_action(1));
            }
        },
        loginOut(){
            dispatch(loginActions.change_login_action(false));
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header); 