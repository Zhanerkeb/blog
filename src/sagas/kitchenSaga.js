import {all, put, takeLatest} from '@redux-saga/core/effects'
import * as types from '../actions/types'
import axios from 'axios'

function* getKitchens() {
    try {
        const kitchenResponse = yield axios.get('http://localhost:5000/api/kitchen').then( res => res.data);
        yield put({type: types.KITCHENS_RECEIVED, payload: kitchenResponse});
    } catch(error) {
        yield put({type: types.KITCHENS_FAILED, error})
    }
}

function* addKitchen(action) {
    const {data} = action;
    try {
        const kitchenResponse = yield axios.post('http://localhost:5000/api/kitchen', data).then( res => res.data);
        yield put({type: types.KITCHEN_ADD_SUCCESS, payload: kitchenResponse});
        yield getKitchens();
    } catch(error) {
        yield put({type: types.KITCHEN_ADD_FAILED, error})
    }
}

function* editKitchen(action) {
    const {data} = action;
    try {
        const kitchenResponse = yield axios.put(`http://localhost:5000/api/kitchen/${data.id}`, {name: data.name}).then( res => res.data);
        yield put({type: types.KITCHEN_EDIT_SUCCESS, payload: kitchenResponse});
        yield getKitchens();
    } catch(error) {
        yield put({type: types.KITCHEN_EDIT_FAILED, error})
    }
}


export function* kitchenSaga() {
    yield all ([
        yield takeLatest(types.GET_KITCHENS, getKitchens),
        yield takeLatest(types.ADD_KITCHEN, addKitchen),
        yield takeLatest(types.EDIT_KITCHEN, editKitchen)
    ])
}
