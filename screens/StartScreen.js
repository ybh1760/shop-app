import React ,{useEffect}from "react";
import {ActivityIndicator, AsyncStorage} from "react-native";
import {useDispatch} from "react-redux";
import * as authActions from "../store/actions/auth";
import Center from "../components/UI/Center";
import Colors from "../constants/Colors";


const StartScreen = props =>{
    const dispatch = useDispatch();

    useEffect(()=>{
        const tryLogin = async()=>{
            const userData = await AsyncStorage.getItem('userData');
            if(!userData){
                props.navigation.navigate('Auth');
                return ;
            }
            const transformedData = JSON.parse(userData);
            const {token, userId, expire} = transformedData;
            const expireDate = new Date(expire);
            if(expireDate <= new Date() || !token || !userId){
                props.navigation.navigate('Auth');
                return ;
            }
            const expireTime = expireDate.getTime() - new Date().getTime;
            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(token, userId, expireTime))
        }

        tryLogin()
    },[dispatch])


    return <Center><ActivityIndicator size="large" color={Colors.primary}/></Center>;
}



export default StartScreen;