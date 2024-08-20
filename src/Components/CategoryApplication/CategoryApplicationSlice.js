import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //awil mat7il il page ijiki tableau appcategories fera8
  appcategories: null,
  loading: true,
};


//The createSlice function is used to create a Redux slice.
// A slice is a portion of your Redux state, 
export const CategoryApplicationSlice = createSlice({
  name: "appcategories",
  initialState,
  reducers: {// Reducers to modify the state
    setCategoryApplicationSlice: (state, action) => {

    // action.payload: This is where the new data (categories) is stored.
      state.appcategories = action.payload; // Set the categories with the data passed in action.payload
      state.loading = false;
    },
    setCategoryApplicationStatus: (state, action) => {
      //payload ki 7ajtik b valeur tista3milha teb3a il documentation mte3 il redux
      state.appcategories = state.appcategories.map((appcategorie) => {
        if (appcategorie.id === action.payload.id) {
          return {
            ...appcategorie,
            status: action.payload.status,
          };
        } else {
          return { ...appcategorie };
        }
      });
    },
  },
});

export const { setCategoryApplicationSlice, setCategoryApplicationStatus } =
CategoryApplicationSlice.actions;
