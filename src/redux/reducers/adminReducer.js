
import { ActionTypes } from "../contants/action_types";

const initialState = {
    products: [],
};

export const getAdminProductReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_ADMIN_PRODUCTS:
            return state.user = payload;
        default:
            return state;
    };
};