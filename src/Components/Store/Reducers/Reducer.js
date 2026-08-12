import {
  CHECK_USER_LOGGED_IN,
  FETCH_USER_REQUEST,
  USER_LOGGED_IN_DETAILS,
  CUSTOMER_REQUEST_ACTIVE_TAB,
  FEEDBACK_ACTIVE_TAB,
  USER_LOG_OUT,
  USER_LOGIN_IN
} from "../Types";

const initialState = {
  loading: false,
  customerRequestActiveTab: 1,
  feedback_active_tab: "1",
  isLoggedIn: false,
  userDetails: null,
};

const Reducer = (state = initialState, action) => {
  console.log("Reducer Initial State:", state);
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGGED_IN_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case CHECK_USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.paylaod,
      };
    case CUSTOMER_REQUEST_ACTIVE_TAB:
      return {
        ...state,
        customerRequestActiveTab: action.payload,
      }
    case USER_LOGIN_IN:
      return initialState
    case USER_LOG_OUT:
      return null
    case FEEDBACK_ACTIVE_TAB:
      return {
        ...state,
        feedback_active_tab: action.payload,
      }
    default:
      return state;
  }
};

export default Reducer;
