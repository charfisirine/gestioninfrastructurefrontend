import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serveurs: null,
  loading: true,
};

// The createSlice function is used to create a Redux slice for managing the state of Serveur.
export const ServeurSlice = createSlice({
  name: "serveurs",
  initialState,
  reducers: {
    // Reducers to modify the state
    setServeurSlice: (state, action) => {
      // Set the serveurs with the data passed in action.payload
      state.serveurs = action.payload;
      state.loading = false;
    },
    setServeurStatus: (state, action) => {
      state.serveurs = state.serveurs.map((serveur) => {
        if (serveur.id === action.payload.id) {
          return {
            ...serveur,
            status: action.payload.status,
          };
        } else {
          return { ...serveur };
        }
      });
    },
    deleteServeurSlice: (state, action) => {
      state.serveurs = state.serveurs.filter(
        (elt) => elt.id !== action.payload
      );
    },
    addServeurSlice: (state, action) => {
      state.serveurs.push(action.payload);
    },
    updateServeurSlice: (state, action) => {
      state.serveurs = state.serveurs.map((serveur) =>
        serveur.id === action.payload.id ? action.payload : serveur
      );
    },
  },
});

// Export the actions to be used in components and sagas
export const {
  setServeurSlice,
  setServeurStatus,
  deleteServeurSlice,
  addServeurSlice,
  updateServeurSlice,
} = ServeurSlice.actions;

// Export the reducer to be used in the store
export default ServeurSlice.reducer;
