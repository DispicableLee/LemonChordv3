import jwtFetch from "./jwt";

// Action type
const RECEIVE_SHOWN_USER = "users/RECEIVE_SHOWN_USER";

// Action creator
export function receiveShownUser(user) {
    return {
        type: RECEIVE_SHOWN_USER,
        user,
    };
}

// Thunk action to fetch a user
export const getOneUser = (userId) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/users/getuser/${userId}`); // Directly use the endpoint
        const data = await res.json();
        dispatch(receiveShownUser(data));
    } catch (err) {
        console.error(err); // Logging errors for debugging
    }
};

// Users reducer
const usersReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case RECEIVE_SHOWN_USER:
            return { ...newState, shownUser: action.user };
        default:
            return newState;
    }
};

export default usersReducer;
