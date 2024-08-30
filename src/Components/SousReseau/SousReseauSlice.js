import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sousReseaux: null,
  loading: true,
};

// The createSlice function is used to create a Redux slice for managing the state of SousReseau.
export const SousReseauSlice = createSlice({
  name: "sousReseaux",
  initialState,
  reducers: {
    // Reducers to modify the state
    setSousReseauxSlice: (state, action) => {
      // Set the sousReseaux with the data passed in action.payload
      state.sousReseaux = action.payload;
      state.loading = false;
    },
    setSousReseauStatus: (state, action) => {
      state.sousReseaux = state.sousReseaux.map((sousReseau) => {
        if (sousReseau.idSousReseau === action.payload.idSousReseau) {
          return {
            ...sousReseau,
            status: action.payload.status,
          };
        } else {
          return { ...sousReseau };
        }
      });
    },
    deleteSousReseauSlice: (state, action) => {
      state.sousReseaux = state.sousReseaux.filter(
        (elt) => elt.idSousReseau !== action.payload
      );
    },
    addSousReseauSlice: (state, action) => {
      if (!state.sousReseaux) {
        state.sousReseaux = []; // Initialize as an empty array if null
      }
      state.sousReseaux.push(action.payload);
    },
    updateSousReseauSlice: (state, action) => {
      state.sousReseaux = state.sousReseaux.map((sousReseau) =>
        sousReseau.idSousReseau === action.payload.idSousReseau ? action.payload : sousReseau
      );
    },
  },
});

// Export the actions to be used in components and sagas
export const {
  setSousReseauxSlice,
  setSousReseauStatus,
  deleteSousReseauSlice,
  addSousReseauSlice,
  updateSousReseauSlice,
} = SousReseauSlice.actions;

export default SousReseauSlice.reducer;
