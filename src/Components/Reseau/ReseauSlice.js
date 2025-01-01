import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reseaux: null,
  loading: true,
};

// The createSlice function is used to create a Redux slice for managing the state of Reseau.
export const ReseauSlice = createSlice({
  name: "reseaux",
  initialState,
  reducers: {
    // Reducers to modify the state
    setReseauSlice: (state, action) => {
      // Set the reseaux with the data passed in action.payload
      state.reseaux = action.payload.map((item) => { return {...item, id: item.idReseau}});
      state.loading = false;
    },
    setReseauStatus: (state, action) => {
      state.reseaux = state.reseaux.map((reseau) => {
        if (reseau.id === action.payload.id) {
          return {
            ...reseau,
            status: action.payload.status,
          };
        } else {
          return { ...reseau };
        }
      });
    },
    deleteReseauSlice: (state, action) => {
      state.reseaux = state.reseaux.filter(
        (elt) => elt.id !== action.payload
      );
    },
    addReseauSlice: (state, action) => {
      state.reseaux.push({...action.payload, id: action.payload.idReseau});
    },
    updateReseauSlice: (state, action) => {
      state.reseaux = state.reseaux.map((reseau) =>
        reseau.id === action.payload.id ? {...action.payload, id: action.payload.idReseau} : reseau
      );
    },
  },
});

// Export the actions to be used in components and sagas
export const {
  setReseauSlice,
  setReseauStatus,
  deleteReseauSlice,
  addReseauSlice,
  updateReseauSlice,
} = ReseauSlice.actions;

// Export the reducer to be added to the store
export default ReseauSlice.reducer;
