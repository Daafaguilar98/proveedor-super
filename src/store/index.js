import React, { createContext, useContext, useReducer } from "react";
import StoreApi from "store/api";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export const useApi = StoreApi;
