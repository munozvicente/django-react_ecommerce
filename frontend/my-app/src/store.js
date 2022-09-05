import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
}); // Here we put in the reducers we will use

// Load cart items from storage into initial state
const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
  JSON.parse(localStorage.getItem('cartItems')) : [];

// Load user info from storage into initial state
const userInfoFromStorage = localStorage.getItem('userInfo') ? 
  JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  cart: { cartItems : cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
