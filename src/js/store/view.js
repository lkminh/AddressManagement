/**
 * Created by minhluong on 4/3/17.
 */
const VIEW_ADD_ADDRESS = "VIEW_ADD_ADDRESS";
const VIEW_EDIT_ADDRESS = "VIEW_EDIT_ADDRESS";
const VIEW_LIST_ADDRESS = "VIEW_LIST_ADDRESS";
export const VIEW_NAME = {
    ADD: "view-add",
    EDIT: "view-edit",
    LIST: "view-list"
};
export function viewAddAddress() {
    return {
        type: VIEW_ADD_ADDRESS
    }
}
export function viewEditAddress(addressId) {
    return {
        type: VIEW_EDIT_ADDRESS,
        addressId
    }
}
export function viewListAddress() {
    return {
        type: VIEW_LIST_ADDRESS
    }
}

export function viewReducer(state = {name: VIEW_LIST_ADDRESS}, action = {}) {
    switch(action.type) {
        case VIEW_EDIT_ADDRESS:
            return {
                name: VIEW_NAME.EDIT,
                addressIdToEdit: action.addressId
            };
        case VIEW_ADD_ADDRESS:
            return {
                name: VIEW_NAME.ADD
            };
        case VIEW_LIST_ADDRESS:
            return {
                name: VIEW_NAME.LIST
            };
        default :
            return state
    }
}