import { createSlice } from "@reduxjs/toolkit";
import { createContext,useReducer } from "react";
import { useContext } from "react";
const initialState = {
  username: "",
  password: "",
  token: "",
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setUser":
      return action.payload;
    case "setNullUser":
      return initialState;
    case "setUsername":
      return [...state, (state.username = action.payload)];
    case "setPassword":
      return [...state, (state.password = action.payload)];
    case "setToken":
      return [...state, (state.token = action.payload)];
    default:
      return state;
  }
};
const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
