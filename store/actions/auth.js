import {AsyncStorage} from "react-native";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const logout = () =>{
    clearTime();
    AsyncStorage.removeItem('userData');
    return {type:LOGOUT}
}

export const authenticate = (token, userId, expireTime) =>{
    return dispatch =>{
        dispatch(setLogoutTimer(expireTime));
        dispatch({type:AUTHENTICATE, token:token, userId:userId})
    }
}

export const signup = (email ,password) =>{
    return async dispatch =>{
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTuElTtxE_Y7UJAsemHVzkhjSJep0rGD0",
        {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            }, 
            body:JSON.stringify({
                email : email,
                password : password,
                returnSecureToken:true
            })
        })
        
        if(!response.ok){
            const errorData = await response.json();
            const error = errorData.error;
            let message = "something went wrong";
            if(error.message === "EMAIL_EXISTS"){
                message="this email existed already"
            }
            throw new Error(message);
        }
        const resData = await response.json();
        dispatch(authenticate(resData.idToken,resData.localId, parseInt(resData.expiresIn)*1000))
        const expireDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        
        storeUserData(resData.idToken,resData.localId, expireDate);
    }
}

export const login = (email,password) =>{
    return async dispatch =>{
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTuElTtxE_Y7UJAsemHVzkhjSJep0rGD0",
        {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email,
                password,
                returnSecureToken:true
            })
        })
        if(!response.ok){
            const resErrorData = await response.json();
            const error = resErrorData.error;
            let message = "something went wrong";
            if(error.message==="EMAIL_NOT_FOUND"){
                message ="this email is not found";
            }else if(error.message==="INVALID_PASSWORD"){
                message ="this password is wrong";
            }
            throw new Error(message);
        }
        const resData = await response.json();
        dispatch(authenticate(resData.idToken,resData.localId,parseInt(resData.expiresIn)*1000))
        
        const expireDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        storeUserData(resData.idToken,resData.localId, expireDate); 
    }
}

const storeUserData = (token, userId ,expireDate) =>{
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        userId,
        expire: expireDate.toISOString()
    }))
}

const setLogoutTimer = (expiryDate) =>{
    return dispatch =>{
        timer=setTimeout(()=>{
            dispatch(logout());
        },expiryDate)
    }
    
}

const clearTime = () =>{
    if(timer){
        clearTimeout(timer);
    }
}