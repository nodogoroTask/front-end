import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const authenticate = (getAccessTokenSilently) => {
  return async (dispatch) => {
    try {
      let token = await getAccessTokenSilently();
      dispatch(authSlice.actions.setToken(token));
    } catch (error) {
      console.log(error);
    }
  };
};

export const authActions = authSlice.actions;

export default authSlice;
