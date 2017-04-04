/**
 * Created by minhluong on 4/3/17.
 */
export const ADD_ADDRESS = "ADD_ADDRESS";
export const DELETE_ADDRESS = "DELETE_ADDRESS";
export const EDIT_ADDRESS = "EDIT_ADDRESS";

export function addAddress(address) {
    address.id  = new Date().getTime();
    return {
        type: ADD_ADDRESS,
        address
    }
}

export function editAddress(id, updatedFields) {
    return {
        type: EDIT_ADDRESS,
        id,
        updatedFields
    }
}

export function deleteAddress(id) {
    return {
        type: DELETE_ADDRESS,
        id
    }
}

export function addressReducer(state = {}, action = {}) {
    switch (action.type) {
        case ADD_ADDRESS: {
            let newState = Object.assign({}, state);
            newState[action.address.id] = action.address;
            return newState;
        }
        case EDIT_ADDRESS: {
            let newState = Object.assign({}, state);
            let newAddress = Object.assign({}, state[action.id], action.updatedFields);
            newState[action.id] = newAddress;
            return newState;
        }
        case DELETE_ADDRESS: {
            let newState = Object.assign({}, state);
            delete newState[action.id];
            return newState;
        }
        default: {
            return state;
        }
    }
}

