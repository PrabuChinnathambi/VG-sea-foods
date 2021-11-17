
import { ActionTypes } from "../contants/action_types";

const initialState = {
    user: [],
    toggle: false
};

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_USER:
            return state.user = payload;
        case ActionTypes.SET_REGISTER:
            return {
                ...state,
                user: [],
                toggle: true
            }
        case ActionTypes.SET_LOGIN:
            return {
                ...state,
                user: [],
                toggle: false
            }
        default:
            return state;
    };
};

