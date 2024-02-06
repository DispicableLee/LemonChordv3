import jwtFetch from "./jwt";

const RECIEVE_SHOWN_USER = "users/RECIEVE_SHOWN_USER"
export function reciveShownUser(user){
    return {
        type: RECIEVE_SHOWN_USER,
        user
    }
}

export const getOneUser = (userId) => async dispatch=>{
    try{
        const res = await jwtFetch(`/api/users/getuser/${userId}`)

        const data = await res.json()
        dispatch(reciveShownUser(data))
    }catch(err){
        console.err(err)
    }
}


const usersReducer = (state={}, action) =>{
    let newState = {...state}
    switch(action.type){
        case RECIEVE_SHOWN_USER:
            return {...newState, shownUser: action.user}
        default:
            return newState
    }
}

export default usersReducer

