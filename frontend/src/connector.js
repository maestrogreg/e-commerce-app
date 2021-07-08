import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/CartReducer';

const reducer = combineReducers({
    productList : productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
});

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart: {cartItems}
};
const middleWare = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;