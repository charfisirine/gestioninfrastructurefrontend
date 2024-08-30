import { put, call } from 'redux-saga/effects';
import axios from "axios";
import { createSliceSaga } from "redux-toolkit-saga";
import {
  setReseauSlice,
  addReseauSlice,
  deleteReseauSlice,
  updateReseauSlice,
} from './ReseauSlice'; // Assurez-vous que ces slices sont bien définis dans votre `ReseauSlice`

export const reseauSaga = createSliceSaga({
  name: "reseauSaga",
  caseSagas: {
    *getReseauxList() {
      try {
        const response = yield call(() => axios.get("http://localhost:9500/api/reseaux"));
        yield put(setReseauSlice(response.data));
      } catch (error) {
        console.error("Failed to fetch networks:", error);
      }
    },

    *postReseauForm(action) {
      try {
        const response = yield call(() =>
          axios.post(
            "http://localhost:9500/api/reseaux",
            action.payload
          )
        );
        if (response.status === 201) {
          yield put(addReseauSlice(response.data));
        }
      } catch (error) {
        console.error("Failed to add network:", error);
      }
    },

    *deleteReseau(action) {
      try {
        const response = yield call(() =>
          axios.delete(`http://localhost:9500/api/reseaux/${action.payload}`)
        );
        if (response.status === 200) {
          yield put(deleteReseauSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to delete network:", error);
      }
    },

    *updateReseau(action) {
      try {
        const response = yield call(() =>
          axios.put(
            `http://localhost:9500/api/reseaux/${action.payload.id}`,
            action.payload
          )
        );
        if (response.status === 200) {
          console.log('Network updated successfully');
          yield put(updateReseauSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to update network:", error);
      }
    },
  },
});

export const {
  getReseauxList,
  postReseauForm,
  deleteReseau,
  updateReseau,
} = reseauSaga.actions;
