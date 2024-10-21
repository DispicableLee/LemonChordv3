import jwtFetch from "./jwt";

const API_URL = process.env.REACT_APP_API;

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
        const res = await jwtFetch(`${API_URL}/api/users/getuser/${userId}`);
        const data = await res.json();
        dispatch(receiveShownUser(data));
    } catch (err) {
        console.error(err); // Fixed typo from console.err to console.error
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
