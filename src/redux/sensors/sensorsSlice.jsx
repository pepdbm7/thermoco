import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialState = {
  sensors: [],
  selectedSensor: {},
  loading: true,
  error: "",
};

export const fetchSensors = createAsyncThunk("getSensors", async (token) => {
  debugger;
  return api
    .get(`api/v1/sensors`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const { data = [], error = "" } = response;
      debugger;
      return { data };
    })
    .catch((err) => {
      debugger;
      if (
        err.message &&
        err.message.includes("Request failed with status code 401")
      ) {
        return { error: "Your session has expired, you have to logout!" };
      }
      return { error: err.message };
    });
});

// export const fetchSensor = createAsyncThunk("", async (sensorId) => {
//   const response = await api.get(`api/access/sensors/${sensorId}`);
//   return response.data;
// });
// export const addNewSensor = createAsyncThunk("", async (newSensor) => {
//   const response = await api.post("api/access/sensors", {
//     sensor: newSensor,
//   });
//   return response.data;
// });
// export const updateSensor = createAsyncThunk(
//   "sensors/updateSensor",
//   async (updatedSensor) => {
//     const response = await api.put(
//       `api/access/sensors/${updatedSensor.sensor_id}`,
//       { sensor: updatedSensor }
//     );
//     return response.data;
//   }
// );
// export const deleteSensor = createAsyncThunk(
//   "sensors/deleteSensor",
//   async (sensorId) => {
//     const response = await api.delete(`api/access/sensors/${sensorId}`);
//     return response.data;
//   }
// );

const sensorsSlice = createSlice({
  name: "sensors",
  initialState,
  reducers: {
    clearPage: (state) => {
      debugger;
      state = initialState;
    },
  },
  extraReducers: {
    [fetchSensors.pending]: (state) => {
      debugger;
      state.loading = true;
    },
    [fetchSensors.fulfilled]: (state, action) => {
      debugger;
      state.sensors = action.payload.data;
      state.error = action.payload.error;
      state.loading = false;
    },
    [fetchSensors.rejected]: (state, action) => {
      debugger;
      state.error = action.error.message;
      state.loading = false;
    },

    // [fetchSensor]: (state, action) => {
    //   state.selectedSensor = action.payload.data;
    //   state.loading = false;
    // },

    // [addNewSensor]: (state, action) => {
    //   state.loading = false;
    // },

    // [deleteSensor]: (state, action) => {
    //   state.loading = false;
    // },

    // [updateSensor]: (state, action) => {
    //   state.selectedSensor = action.payload.data;
    //   state.loading = false;
    // },
  },
});

export default sensorsSlice.reducer;

export const getAllSensors = (state) => state.sensors.sensors;
export const getLoading = (state) => state.sensors.loading;
export const selectSelectedSensor = (state) => state.sensors.selectedSensor;
export const { clearPage } = sensorsSlice.actions;
