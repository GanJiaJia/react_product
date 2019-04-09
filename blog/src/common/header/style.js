import styled from 'styled-components';
import logoPic from '../../static/logo.png';
export const HeaderWrapper  = styled.div`
    height: 56px;
    border-bottom: 1px solid #f0f0f0;
`
export const Logo  = styled.div`
    height: 56px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
    background : url(${ logoPic });
    background-size : contain;
`
export const Nav = styled.div`
    width: 903px;
    height: 100%;
    margin: 0 auto;
    padding-right:70px;
    box-sizing: border-box;
`
export const NavItem = styled.div`
    &.left{
        float: left;
    }
    &.left:hover{
        color: #000;
    }
    &.right{
        float: right;
        color:#969696
    }
    &.active{
        color : #ea5f6a;
    }
    line-height : 56px;
    padding: 0 15px;
    font-size: 17px;

`

export const NavSearch = styled.input.attrs({
    placeholder : '搜索'
})`
    width: 160px;
    height: 38px;
    border: none;
    outline: none;
    border-radius : 19px;
    margin-top: 9px;
    padding: 0 30px 0 20px;
    box-sizing: border-box;
    background-color : #eee;
    font-size: 14px;
    margin-left: 20px;
    color: #666;
    &::placeholder{
        color: #999;
    }
    &.focus{
        width:240px;
    }
    &.slide-enter{
        transition : all .2s ease-out;
    }
    &.slide-enter-active{
       width: 240px;
    }
    &.slide-exit{
        transition : all .2s ease-out;
    }
    &.slide-exit-active{
        width: 160px;
    }
`

export const Addition = styled.div`
    position: absolute;
    height: 56px;
    right: 0;
    top: 0;
`
export const Button = styled.div`
    float: right;
    margin-top: 9px;
    line-height : 38px;
    border-radius: 19px;
    border: 1px solid #ec6149;
    margin-right: 20px;
    padding: 0 20px;
    &.reg {
        color :#ec6149;
    }
    &.writting{
        background: #ec6149;
        color: #fff;
    }
`

export const SearchWrap  = styled.div`
    float: left;
    position: relative;
    .zoom{
        position: absolute;
        right: 5px;
        bottom: 3px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 15px;
        transition: all .3s;
        cursor: pointer;
        &.focus{
            background: pink;
        }
    }

`
export const SeacrInfo = styled.div`
    position : absolute;
    top: 56px;
    left: 0;
    width: 240px;
    padding : 0 20px;
    box-shadow: 0 0 8px rgba( 0, 0, 0, 0.2);
    background : #fff;
`

export const SearchTitle = styled.div`
    margin: 20px 0 15px 0;
    font-size: 14px;
    color: #969696;
    line-height: 20px;
`
export const SearchInfoSwitch = styled.span`
    float: right;
    font-size: 12px;
    cursor: pointer;
    .spin{
        display: block;
        float: left;
        font-size: 12px;
        margin-right: 3px;
        transition: all .2s ease-in;
        transform-origin : center center;
    }
`

export const SearchInfoItem = styled.a`
    display:block;
    float: left;
    line-height: 20px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid  #ddd;
    color: #787878;
    margin: 0 10px 10px 0;
    padding: 2px 8px;
    border-radius: 5px;
`

export const SearchInfoList = styled.div`
    overflow: hidden;

`