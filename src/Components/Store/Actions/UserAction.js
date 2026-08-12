import {
  CHECK_USER_LOGGED_IN,
  FETCH_USER_REQUEST,
  USER_LOGGED_IN_DETAILS,
  CUSTOMER_REQUEST_ACTIVE_TAB,
  FEEDBACK_ACTIVE_TAB,
  USER_LOG_OUT,
  USER_LOGIN_IN,
} from "../Types";


export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const checkUserLoggedIn = (payload) => {
  return {
    type: CHECK_USER_LOGGED_IN,
    payload,
  };
};

export const setLoggedInUserDetails = (payload) => {
  return {
    type: USER_LOGGED_IN_DETAILS,
    payload,
  };
};

export const setCustomerRequestActiveTab = (payload) => {
  return {
    type: CUSTOMER_REQUEST_ACTIVE_TAB,
    payload,
  };
}

export const setfeedbackActiveTab = (payload) => {
  return {
    type: FEEDBACK_ACTIVE_TAB,
    payload,
  };
}

export const setUserLogout = (payload) => {
  return {
    type: USER_LOG_OUT,
    payload,
  }
}

export const setUserLogin = (payload) => {
  return {
    type: USER_LOGIN_IN,
    payload,
  }
}