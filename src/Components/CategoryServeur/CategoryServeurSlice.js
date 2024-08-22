import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryServeurs: null, // Un tableau des catégories de serveurs
  loading: true,
};

export const CategoryServeurSlice = createSlice({
  name: "categoryServeur",
  initialState,
  reducers: {
    setCategoryServeurSlice: (state, action) => {
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

export const {
  setCategoryServeurSlice,
  setCategoryServeurStatus,
  deleteCategoryServeurSlice,
  addCategoryServeurSlice,
  updateCategoryServeurSlice,
} = CategoryServeurSlice.actions;

export default CategoryServeurSlice.reducer;
