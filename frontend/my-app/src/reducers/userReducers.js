import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,

  USER_LOGOUT,
  
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }; // se hace el llamado, aún no hay respuesta

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }; // ya se hizo el llamado y se guarda en el estado la data de productos

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }; // ya se hizo el llamado y se guarda en el estado el error

    case USER_LOGOUT:
      return { }; //

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
      
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
      
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};