import * as types from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    isLoading: false,
    authResponse: '',
    isAuth: false,
    user: {}
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case types.SIGN_UP:
            return {...state, isLoading: true};
        case types.SIGN_UP_SUCCESS: 
            return {...state, isLoading: false, authResponse: action.payload};
        case types.SIGN_UP_FAILED: 
            return {...state, isLoading: false, error: action.error};
        case types.SIGN_IN: 
            return {...state, isLoading: true};
        case types.SET_CURRENT_USER: 
            return {...state, isLoading: false, user: action.payload, isAuth: isEmpty(action.payload)}
        case types.SIGN_IN_FAILED:
            return {...state, isLoading: false, error: action.error}
        default:
            return state;
    }
}