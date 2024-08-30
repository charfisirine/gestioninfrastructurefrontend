import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clusterApplications: [], 
    loading: true,
};

export const ClusterApplicationSlice = createSlice({
    name: "clusterApplications",
    initialState,
    reducers: {
        setClusterApplicationSlice: (state, action) => {
            state.clusterApplications = action.payload || []; // Ajout d'une sécurité pour éviter un undefined
            state.loading = false;
        },
        setClusterApplicationStatus: (state, action) => {
            state.clusterApplications = state.clusterApplications.map((clusterApplication) => {
                if (clusterApplication.id === action.payload.id) {
                    return {
                        ...clusterApplication,
                        status: action.payload.status,
                    };
                }
                return clusterApplication; 
            });
        },
        deleteClusterApplicationSlice: (state, action) => {
            state.clusterApplications = state.clusterApplications.filter(
                (elt) => elt.id !== action.payload
            );
        },
        addClusterApplicationSlice: (state, action) => {
            state.clusterApplications.push(action.payload);
        },
        updateClusterApplicationSlice: (state, action) => {
            state.clusterApplications = state.clusterApplications.map((clusterApplication) =>
                clusterApplication.id === action.payload.id ? action.payload : clusterApplication
            );
        },
    },
});

export const {
    setClusterApplicationSlice,
    setClusterApplicationStatus,
    deleteClusterApplicationSlice,
    addClusterApplicationSlice,
    updateClusterApplicationSlice,
} = ClusterApplicationSlice.actions;

export default ClusterApplicationSlice.reducer;
