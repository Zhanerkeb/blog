import {all, put, takeLatest} from '@redux-saga/core/effects'
import * as types from '../actions/types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

function* signUp(action) {
    const {data} = action;
    try {
        const authResponse = yield axios.post('http://localhost:5000/api/users/register', data).then( res => res.data);
        yield put({type: types.SIGN_UP_SUCCESS, payload: authResponse});
    } catch(error) {
        yield put({type: types.SIGN_UP_FAILED, error})
    }
}

function* signIn(action) {
    const {data, history} = action;
    try {
        const authResponse = yield axios.post('http://localhost:5000/api/users/login', data).then(res => res.data);
        const {token} = authResponse;
        setAuthToken(token);
        localStorage.setItem('token', token);
        const decoded = jwt_decode(token);
        yield put({type: types.SET_CURRENT_USER, payload: decoded});   
        history.push('/dashboard')    
    } catch(error) {
        yield put({type: types.SIGN_IN_FAILED, error})
    }
}

export function* authSaga() {
    yield all ([
        yield takeLatest(types.SIGN_UP, signUp),      
        yield takeLatest(types.SIGN_IN, signIn)
    ])
}
