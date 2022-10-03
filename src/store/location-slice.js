import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getConfig } from "../config";
import { notify } from "react-notify-toast";
import { formGroups } from "../utils/formGroups";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    locations: [],
    locationsGroups: new Map(),
    currentCoordinates:{}
  },
  reducers: {
    addLocation(state, action) {
      state.locations = [action.payload, ...state.locations];
      state.locationsGroups = formGroups([action.payload, ...state.locations]);
    },
    setLocations(state, action) {
      state.locations = action.payload;
      state.locationsGroups = formGroups(action.payload);
    },
  },
});

export const saveLocation = (token, data, geolocation) => {
  return async (dispatch) => {
    try {
      const { apiOrigin } = getConfig();
      data.coordinate = {
        lat: geolocation.latitude,
        lng: geolocation.longitude,
      };
      await axios(`${apiOrigin}/api/location`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        method: "post",
        data,
      });
      dispatch(locationSlice.actions.addLocation(data));

      notify.show("Record Saved!", "success");
    } catch (error) {
      notify.show("Record Not Saved", "error");
    }
  };
};
export const getLocations = (token) => {
  return async (dispatch) => {
    try {
      const { apiOrigin } = getConfig();
      const response = await axios(`${apiOrigin}/api/location`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      let data = response?.data?.locations;
      dispatch(locationSlice.actions.setLocations(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const locationActions = locationSlice.actions;

export default locationSlice;
