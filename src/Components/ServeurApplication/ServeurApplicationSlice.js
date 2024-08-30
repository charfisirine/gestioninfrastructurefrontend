import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serveurApplications: null,
  loading: true,
};

// The createSlice function is used to create a Redux slice for managing the state of ServeurApplication.
export const ServeurApplicationSlice = createSlice({
  name: "serveurApplications",
  initialState,
  reducers: {
    // Reducers to modify the state
    setServeurApplicationSlice: (state, action) => {
      // Set the serveurApplications with the data passed in action.payload
      state.serveurApplications = action.payload;
      state.loading = false;
    },
    setServeurApplicationStatus: (state, action) => {
      state.serveurApplications = state.serveurApplications.map((serveurApplication) => {
        if (serveurApplication.id === action.payload.id) {
          return {
            ...serveurApplication,
            status: action.payload.status,
          };
        } else {
          return { ...serveurApplication };
        }
      });
    },
    deleteServeurApplicationSlice: (state, action) => {
      state.serveurApplications = state.serveurApplications.filter(
        (elt) => elt.id !== action.payload
      );
    },
    addServeurApplicationSlice: (state, action) => {
      state.serveurApplications.push(action.payload);
    },
    updateServeurApplicationSlice: (state, action) => {
      state.serveurApplications = state.serveurApplications.map((serveurApplication) =>
        serveurApplication.id === action.payload.id ? action.payload : serveurApplication
      );
    },
  },
});

// Export the actions to be used in components and sagas
export const {
  setServeurApplicationSlice,
  setServeurApplicationStatus,
  deleteServeurApplicationSlice,
  addServeurApplicationSlice,
  updateServeurApplicationSlice,
} = ServeurApplicationSlice.actions;

export default ServeurApplicationSlice.reducer;
