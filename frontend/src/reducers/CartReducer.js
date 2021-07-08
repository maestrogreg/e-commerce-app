import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/CartConstants';

export const cartReducer = ( state = {cartItems: []}, action ) =>{
    switch(action.type){
        case CART_ADD_ITEM:
            const data = action.payload;

            const existingItem = state.cartItems.find((item) => item.product === data.product);

            if(existingItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => item.product ===existingItem.product ? data : item)
                }
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, data]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.product !== action.payload)
            }
        default:
            return state;
    }
}