import axios from "axios";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const { data } = await axios.post(
        '/api/users/login/',
        { 'username': email, 'password': password },
        config
    )

    dispatch({
      // Guarda la data en el payload para la respuesta en el caso de haber sido exitoso el llamado
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      // Guarda el error en el payload para la respuesta en el caso de haber fallado el llamado
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
