import { put, call } from 'redux-saga/effects';
import axios from "axios";
import { createSliceSaga } from "redux-toolkit-saga";
import {
  setServeurSlice,
  addServeurSlice,
  deleteServeurSlice,
  updateServeurSlice,
} from './ServeurSlice';

export const serveurSaga = createSliceSaga({
  name: "serveurSaga",
  caseSagas: {
    *getServeursList() {
      try {
        const response = yield call(() => axios.get("http://localhost:9500/api/serveurs"));
        yield put(setServeurSlice(response.data));
      } catch (error) {
        console.error("Failed to fetch serveurs:", error);
      }
    },

    *postServeurForm(action) {
      try {
        const response = yield call(() =>
          axios.post(
            "http://localhost:9500/api/serveurs",
            action.payload
          )
        );
        if (response.status === 201) {
          yield put(addServeurSlice(response.data));
        }
      } catch (error) {
        console.error("Failed to add serveur:", error);
      }
    },

    *deleteServeur(action) {
      try {
        const response = yield call(() =>
          axios.delete(`http://localhost:9500/api/serveurs/${action.payload}`)
        );
        if (response.status === 200) {
          yield put(deleteServeurSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to delete serveur:", error);
      }
    },

    *updateServeur(action) {
      try {
        const response = yield call(() =>
          axios.put(
            `http://localhost:9500/api/serveurs/${action.payload.id}`,
            action.payload
          )
        );
        if (response.status === 200) {
          console.log('Serveur updated successfully');
          yield put(updateServeurSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to update serveur:", error);
      }
    },
  },
});

export const {
  getServeursList,
  postServeurForm,
  deleteServeur,
  updateServeur,
} = serveurSaga.actions;
