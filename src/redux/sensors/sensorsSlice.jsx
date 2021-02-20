import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

// export const setLoader = (bool) => {
//   return bool;
// };

export const fetchSensors = createAsyncThunk("", async (token) => {
  const { data } = await api.get(`api/v1/sensors`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("SENSORS", data);

  return {
    fulfilled: !!data,
    sensors: data,
    rejected: !data || (data && !data.length),
  };
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
  initialState: {
    sensors: [],
    selectedSensor: {},
    loading: true,
    status: {
      type: "idle",
      error: null,
    },
  },
  reducers: {},
  extraReducers: {
    // [setLoader]: (state, action) => {
    //   state.loading = action.payload.loading;
    // },
    [fetchSensors.fullfilled]: (state, action) => {
      state.sensors = action.payload.sensors;
      state.status.type = "succeeded";
      state.loading = false;
    },
    [fetchSensors.rejected]: (state, action) => {
      state.sensors = action.payload.sensors;
      state.status.type = "failed";
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
