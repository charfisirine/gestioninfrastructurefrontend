import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // The initial state for the sites
  sites: null,
  loading: true,
};

// The createSlice function is used to create a Redux slice.
// A slice is a portion of your Redux state.
export const SiteSlice = createSlice({
  name: "sites",
  initialState,
  reducers: {
    // Reducers to modify the state
    setSiteSlice: (state, action) => {
      // action.payload: This is where the new data (sites) is stored.
      state.sites = action.payload; // Set the sites with the data passed in action.payload
      state.loading = false;
    },
    setSiteStatus: (state, action) => {
      // Update the status of a specific site based on the payload
      state.sites = state.sites.map((site) => {
        if (site.id === action.payload.id) {
          return {
            ...site,
            status: action.payload.status,
          };
        } else {
          return { ...site };
        }
      });
    },
    deleteSiteSlice: (state, action) => {
      // Remove a site from the sites array by its ID
      state.sites = state.sites.filter(
        (elt) => elt.id !== action.payload
      );
    },
    addSiteSlice: (state, action) => {
      // Add a new site to the sites array
      state.sites.push(action.payload);
    },
    updateSiteSlice: (state, action) => {
      // Update an existing site based on its ID
      state.sites = state.sites.map((site) =>
        site.id === action.payload.id ? action.payload : site
      );
    },
  },
});

// Exporting the actions for use in your components
export const {
  setSiteSlice,
  setSiteStatus,
  deleteSiteSlice,
  addSiteSlice,
  updateSiteSlice,
} = SiteSlice.actions;

export default SiteSlice.reducer; // Export the reducer for store configuration
