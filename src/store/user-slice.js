import { createSlice } from "@reduxjs/toolkit";
import { getConfig } from "../config";
import axios from "axios";
import { notify } from "react-notify-toast";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    email_verified: false,
    nickname: "",
    picture: "",
    sub: "",
    updated_at: "",
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload.name;
    },
    setUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.email_verified = false;
      state.nickname = action.payload.nickName;
      state.picture = action.payload.picture;
      state.sub = action.payload.sub;
      state.updated_at = action.payload.updated_at;
    },
  },
});

export const updateUser = (token, data, user) => {
  return async (dispatch) => {
    try {
      const { apiOrigin } = getConfig();

      await axios(`${apiOrigin}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "put",
        data,
      });
      dispatch(userSlice.actions.setName(data));
      console.log(user);
      notify.show("Record Saved!", "success");
    } catch (error) {
      notify.show("Record Not Saved!", "error");
    }
  };
};

export const userActions = userSlice.actions;

export default userSlice;
