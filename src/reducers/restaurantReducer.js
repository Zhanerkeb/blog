import * as types from "../actions/types";

const initialState = {
    isLoading: false,
    restaurant: {},
    restaurantResponse: ""
}

export default function restaurantReducer(state= initialState, action) {
    switch (action.type) {
        case types.GET_RESTAURANTS:
            return {...state, isLoading: true}
        case types.RESTAURANTS_RECEIVED:
            return {...state, isLoading: false, restaurant: action.payload}
        case types.RESTAURANTS_FAILED:
            return {...state, isLoading: false, error: action.error}
        case types.ADD_RESTAURANT:
           return {...state, isLoading: true, error: action.error}
        case types.RESTAURANT_ADD_SUCCESS:
            return {...state, isLoading: false, restaurantResponse: action.payload, error: action.error}
        case types.RESTAURANT_ADD_FAILED:
            return {...state, isLoading: false, error: action.error}
        case types.DELETE_RESTAURANT:
            return  {...state, isLoading: true, restaurantResponse: action.payload, error: action.error}
        case types.DELETE_RESTAURANT_SUCCESS:
            return  {...state, isLoading: false, error: action.error}
        default:
            return state;
    }
}