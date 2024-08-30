import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Au démarrage de la page, le tableau applications sera vide
  applications: null,
  loading: true,
};

// La fonction createSlice est utilisée pour créer un slice Redux.
// Un slice est une portion de votre état Redux.
export const ApplicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    // Réducteurs pour modifier l'état
    setApplicationSlice: (state, action) => {
      // action.payload : c'est ici que les nouvelles données (applications) sont stockées.
      state.applications = action.payload; // Met à jour le tableau applications avec les données passées dans action.payload
      state.loading = false;
    },
    setApplicationStatus: (state, action) => {
      // Modifie le statut d'une application spécifique
      state.applications = state.applications.map((application) => {
        if (application.id === action.payload.id) {
          return {
            ...application,
            status: action.payload.status,
          };
        } else {
          return { ...application };
        }
      });
    },
    deleteApplicationSlice: (state, id) => {
      // Supprime une application par son id
      state.applications = state.applications.filter(
        (elt) => elt.id !== id.payload
      );
    },
    addApplicationSlice: (state, action) => {
      // Ajoute une nouvelle application au tableau applications
      state.applications.push(action.payload);
    },
    updateApplicationSlice: (state, action) => {
      // Met à jour une application spécifique par son id
      state.applications = state.applications.map((application) =>
        application.id === action.payload.id ? action.payload : application
      );
    },
  },
});

export const {
  setApplicationSlice,
  setApplicationStatus,
  deleteApplicationSlice,
  addApplicationSlice,
  updateApplicationSlice
} = ApplicationSlice.actions;

export default ApplicationSlice.reducer;
