import {all, put, takeLatest} from "@redux-saga/core/effects"
import * as types from "../actions/types"
import axios from "axios"


function* getRestaurants(action) {
    const {data} = action
    if (data) {
        try {
            const restaurantResponse = yield axios.get(`http://localhost:5000/api/restaurant?query=${data.query}&page=${data.page}`).then(res => res.data);
            yield put({type: types.RESTAURANTS_RECEIVED, payload: restaurantResponse});
        } catch(error) {
            yield put({type:types.RESTAURANTS_FAILED, error})
        }
    } else
    try {
        const restaurantResponse = yield axios.get(`http://localhost:5000/api/restaurant?query=&page=`).then(res => res.data);
        yield put({type: types.RESTAURANTS_RECEIVED, payload: restaurantResponse});
    } catch(error) {
        yield put({type:types.RESTAURANTS_FAILED, error})
    }
}

function* deleteRestaurant(action) {
    const {data} = action;
    try {
        const restaurantResponse = yield axios.delete(`http://localhost:5000/api/restaurant/${data}`).then(res => res.data);
        yield put({type: types.DELETE_RESTAURANT_SUCCESS, payload: restaurantResponse});
        yield getRestaurants({data: {query: ``, page: 1}});
    } catch(error) {
        yield put({type:types.RESTAURANTS_FAILED, error})
    }
}

function* addRestaurant(action) {
    const {data} = action;
    console.log(data)
    const fm = new FormData();
    fm.append('name', data.name);
    fm.append('location', data.location);
    fm.append('image', data.image);
    fm.append('kitchens', JSON.stringify(data.kitchens));
    fm.append('averageBill', data.averageBill)
    fm.append('amountOfPlace', data.amountOfPlace)
    fm.append('phone', data.phone)
    fm.append('rate', data.rate)
    try {
        const restaurantResponse = yield axios.post("http://localhost:5000/api/restaurant", fm).then(res => res.data);
        yield put({type: types.RESTAURANT_ADD_SUCCESS, payload: restaurantResponse});
        yield getRestaurants({data: {query: ``, page: 1}});

    } catch(error) {
        yield put({type:types.RESTAURANT_ADD_FAILED, error})
    }
}

export function* restaurantSaga() {
    yield all ([
        yield takeLatest(types.GET_RESTAURANTS, getRestaurants),
        yield takeLatest(types.ADD_RESTAURANT, addRestaurant),
        yield takeLatest(types.DELETE_RESTAURANT, deleteRestaurant),
    ])
}