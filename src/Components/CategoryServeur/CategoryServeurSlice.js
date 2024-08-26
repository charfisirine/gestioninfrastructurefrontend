import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryServeurs: null,
  loading: true,
};

// The createSlice function is used to create a Redux slice for managing the state of CategoryServeur.
export const CategoryServeurSlice = createSlice({
  name: "categoryServeurs",
  initialState,
  reducers: {
    // Reducers to modify the state
    setCategoryServeurSlice: (state, action) => {
      // Set the categoryServeurs with the data passed in action.payload
      state.categoryServeurs = action.payload;
      state.loading = false;
    },
    setCategoryServeurStatus: (state, action) => {
      state.categoryServeurs = state.categoryServeurs.map((categoryServeur) => {
        if (categoryServeur.id === action.payload.id) {
          return {
            ...categoryServeur,
            status: action.payload.status,
          };
        } else {
          return { ...categoryServeur };
        }
      });
    },
    deleteCategoryServeurSlice: (state, action) => {
      state.categoryServeurs = state.categoryServeurs.filter(
        (elt) => elt.id !== action.payload
      );
    },
    addCategoryServeurSlice: (state, action) => {
      state.categoryServeurs.push(action.payload);
    },
    updateCategoryServeurSlice: (state, action) => {
      state.categoryServeurs = state.categoryServeurs.map((categoryServeur) =>
        categoryServeur.id === action.payload.id ? action.payload : categoryServeur
      );
    },
  },
});

// Export the actions to be used in components and sagas
export const {
  setCategoryServeurSlice,
  setCategoryServeurStatus,
  deleteCategoryServeurSlice,
  addCategoryServeurSlice,
  updateCategoryServeurSlice,
} = CategoryServeurSlice.actions;
