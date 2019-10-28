export const SIGNUP = "SINGUP";
export const LOGIN = "LOGIN";

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
        
        return dispatch({type:SIGNUP ,token:resData.idToken, userId:resData.localId })
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
        console.log(resData);
        return dispatch({type:LOGIN ,token:resData.idToken, userId:resData.localId })
    }
}