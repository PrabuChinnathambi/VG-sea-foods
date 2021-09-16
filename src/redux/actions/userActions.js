import { ActionTypes } from "../contants/action_types"

export const setUser = (value) => {
    return{
        type : ActionTypes.SET_USER,
        payload : value,
    };
};