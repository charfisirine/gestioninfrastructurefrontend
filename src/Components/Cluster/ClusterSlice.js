import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clusters: null,
  loading: true,
};

export const ClusterSlice = createSlice({
  name: "clusters",
  initialState,
  reducers: {
    setClusterList: (state, action) => {
      state.clusters = action.payload; // Set the clusters with the data passed in action.payload
      state.loading = false;
    },
    deleteClusterSlice: (state, action) => {
      state.clusters = state.clusters.filter(
        (cluster) => cluster.id !== action.payload
      );
    },
    addClusterSlice: (state, action) => {
      state.clusters.push(action.payload);
    },
    updateClusterSlice: (state, action) => {
      state.clusters = state.clusters.map((cluster) =>
        cluster.id === action.payload.id ? action.payload : cluster
      );
    },
  },
});

export const {
  setClusterList,
  deleteClusterSlice,
  addClusterSlice,
  updateClusterSlice,
} = ClusterSlice.actions;

export default ClusterSlice.reducer; // Don't forget to export the reducer
