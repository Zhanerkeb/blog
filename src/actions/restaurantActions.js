import * as types from "./types"


export function getRestaurants(data) {
    return {type: types.GET_RESTAURANTS, data}

}

export function addRestaurant(data) {
    return {type: types.ADD_RESTAURANT, data}

}

export function deleteRestaurant(data) {
    return {type: types.DELETE_RESTAURANT, data}

}