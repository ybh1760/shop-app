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
            throw new Error("Something is wrong");
        }
        const resData = await response.json();
        

        return dispatch({type:SIGNUP })
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
            throw new Error("error occured in Login");
        }
        const resData = await response.json();
        console.log(resData);
        return dispatch({type:LOGIN})
    }
}