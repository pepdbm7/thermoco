import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchSensors = createAsyncThunk(
  "sensors/fetchSensors",
  async (page = null) => {
    const response = await api.get(
      `api/access/sensors/list/${page !== null ? page : ""}`
    );
    return response.data;
  }
);
export const fetchSensor = createAsyncThunk(
  "sensors/fetchSensor",
  async (sensorId) => {
    const response = await api.get(`api/access/sensors/${sensorId}`);
    return response.data;
  }
);
export const addNewSensor = createAsyncThunk(
  "sensors/addNewSensor",
  async (newSensor) => {
    const response = await api.post("api/access/sensors", {
      sensor: newSensor,
    });
    return response.data;
  }
);
export const updateSensor = createAsyncThunk(
  "sensors/updateSensor",
  async (updatedSensor) => {
    const response = await api.put(
      `api/access/sensors/${updatedSensor.sensor_id}`,
      { sensor: updatedSensor }
    );
    return response.data;
  }
);
export const deleteSensor = createAsyncThunk(
  "sensors/deleteSensor",
  async (sensorId) => {
    const response = await api.delete(`api/access/sensors/${sensorId}`);
    return response.data;
  }
);
const sensorsSlice = createSlice({
  name: "sensors",
  initialState: {
    sensors: [],
    selectedSensor: {},
    status: {
      type: "idle",
      error: null,
    },
    pagination: { pages: 0 },
  },
  reducers: {},
  extraReducers: {
    [fetchSensors.pending]: (state, action) => {
      state.status.type = "loading";
    },
    [fetchSensors.fulfilled]: (state, action) => {
      state.status.type = "succeeded";
      state.sensors = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    [fetchSensors.rejected]: (state, action) => {
      state.status.type = "failed";
      state.status.error = action.error.message;
    },

    [fetchSensor.pending]: (state, action) => {
      state.status.type = "loading";
    },
    [fetchSensor.fulfilled]: (state, action) => {
      state.status.type = "succeeded";
      state.selectedSensor = action.payload.data;
    },
    [fetchSensor.rejected]: (state, action) => {
      state.status.type = "failed";
      state.status.error = action.error.message;
    },

    [addNewSensor.fulfilled]: (state, action) => {
      state.status.type = "idle";
    },

    [deleteSensor.fulfilled]: (state, action) => {
      state.status.type = "idle";
    },

    [updateSensor.pending]: (state, action) => {
      state.status.type = "loading";
    },
    [updateSensor.fulfilled]: (state, action) => {
      state.status.type = "succeeded";
      state.selectedSensor = action.payload.data;
    },
  },
});

export const { sensorUpdated } = sensorsSlice.actions;
export default sensorsSlice.reducer;

export const selectAllSensors = (state) => state.sensors.sensors;
export const selectSelectedSensor = (state) => state.sensors.selectedSensor;
