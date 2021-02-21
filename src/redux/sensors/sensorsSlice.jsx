import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialState = {
  sensors: [],
  selectedSensor: {},
  loading: true,
  error: "",
};

export const fetchSensors = createAsyncThunk(
  "sensors/getSensors",
  async (token) => {
    return api
      .get(`api/v1/sensors`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { data = [] } = response;
        return { data };
      })
      .catch((err) => {
        if (
          err.message &&
          err.message.includes("Request failed with status code 401")
        ) {
          return { error: "Your session has expired, you have to logout!" };
        }
        return { error: err.message };
      });
  }
);

export const addSensor = createAsyncThunk(
  "sensors/addSensor",
  async ({ token, newSensor }) => {
    return api
      .post("/api/v1/sensors/", newSensor, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        fetchSensors(token);

        return { newSensor };
      })
      .catch((err) => {
        if (
          err.message &&
          err.message.includes("Request failed with status code 401")
        ) {
          return { error: "Your session has expired, you have to logout!" };
        }
        return { error: err.message };
      });
  }
);

// export const fetchSensor = createAsyncThunk("", async (sensorId) => {
//   const response = await api.get(`api/access/sensors/${sensorId}`);
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

export const deleteSensor = createAsyncThunk(
  "sensors/deleteSensor",
  async ({ token, id }) => {
    return api
      .delete(`/api/v1/sensors/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => ({ id }))
      .catch((err) => {
        return { error: err.message };
      });
  }
);

const sensorsSlice = createSlice({
  name: "sensors",
  initialState,
  reducers: {
    clearPage: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    [fetchSensors.pending]: (state) => {
      state.loading = true;
    },
    [fetchSensors.fulfilled]: (state, action) => {
      state.sensors = action.payload.data || [];
      state.error = action.payload.error || "";
      state.loading = false;
    },
    [fetchSensors.rejected]: (state, action) => {
      state.error = action.error.message || "";
      state.loading = false;
    },

    // [fetchSensor]: (state, action) => {
    //   state.selectedSensor = action.payload.data;
    //   state.loading = false;
    // },

    [addSensor.fulfilled]: (state, action) => {
      debugger;
      const addedNew =
        (state.sensors || []).push(action.payload.newSensor) || [];
      debugger;
      state.sensors = addedNew;
      state.error = action.payload.error || "";
      state.loading = false;
    },

    [addSensor.rejected]: (state, action) => {
      state.error = action.error.message || "";
      state.loading = false;
    },

    [deleteSensor.fulfilled]: (state, action) => {
      state.sensors =
        state.sensors.filter((sensor) => sensor.id === action.payload.id) || [];
      state.error = action.payload.error || "";
      state.loading = false;
    },

    [deleteSensor.rejected]: (state, action) => {
      state.error = action.error.message || "";
      state.loading = false;
    },

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
