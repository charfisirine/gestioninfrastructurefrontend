import { put, call } from 'redux-saga/effects';
import axios from "axios";
import { createSliceSaga } from "redux-toolkit-saga";
import {
  setServeurApplicationSlice,
  addServeurApplicationSlice,
  deleteServeurApplicationSlice,
  updateServeurApplicationSlice,
} from './ServeurApplicationSlice';

export const serveurApplicationSaga = createSliceSaga({
  name: "serveurApplicationSaga",
  caseSagas: {
    *getServeurApplicationsList() {
      try {
        const response = yield call(() => axios.get("http://localhost:9500/api/serveurApplications"));
        yield put(setServeurApplicationSlice(response.data));
      } catch (error) {
        console.error("Failed to fetch serveur applications:", error);
      }
    },

    *postServeurApplicationForm(action) {
      try {
        const response = yield call(() =>
          axios.post(
            "http://localhost:9500/api/serveurApplications",
            action.payload
          )
        );
        if (response.status === 201) {
          yield put(addServeurApplicationSlice(response.data));
        }
      } catch (error) {
        console.error("Failed to add serveur application:", error);
      }
    },

    *deleteServeurApplication(action) {
      try {
        const response = yield call(() =>
          axios.delete(`http://localhost:9500/api/serveurApplications/${action.payload}`)
        );
        if (response.status === 200) {
          yield put(deleteServeurApplicationSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to delete serveur application:", error);
      }
    },

    *updateServeurApplication(action) {
      try {
        const response = yield call(() =>
          axios.put(
            `http://localhost:9500/api/serveurApplications/${action.payload.id}`,
            action.payload
          )
        );
        if (response.status === 200) {
          console.log('Serveur application updated successfully');
          yield put(updateServeurApplicationSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to update serveur application:", error);
      }
    },
  },
});

export const {
  getServeurApplicationsList,
  postServeurApplicationForm,
  deleteServeurApplication,
  updateServeurApplication,
} = serveurApplicationSaga.actions;
