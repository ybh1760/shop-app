import React,{useRef, useEffect} from "react";
import {useSelector} from "react-redux";
import {NavigationActions} from "react-navigation";

import ShopNavigator from "./ShopNavigator";

export default function NavigatorContainer(props){
    const shop = useRef();
    const isAuth = useSelector(state=>!!state.auth.token);
    useEffect(()=>{
        if(!isAuth){
            shop.current.dispatch(NavigationActions.navigate({routeName:"Auth"}));
        }
    },[isAuth])
    
    return <ShopNavigator ref={shop}/>
}