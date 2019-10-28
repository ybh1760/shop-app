export const SIGNUP = "SINGUP";

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
        console.log(resData);

        return dispatch({type:SIGNUP })
    }
}