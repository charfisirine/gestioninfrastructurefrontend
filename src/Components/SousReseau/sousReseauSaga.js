import { put, call } from 'redux-saga/effects';
import axios from "axios";
import { createSliceSaga } from "redux-toolkit-saga";
import {
  setSousReseauxSlice,
  addSousReseauSlice,
  deleteSousReseauSlice,
  updateSousReseauSlice,
} from './SousReseauSlice';

export const sousReseauSaga = createSliceSaga({
  name: "sousReseauSaga",
  caseSagas: {
    *getSousReseauxList() {
      try {
        const response = yield call(() => axios.get("http://localhost:9500/api/sousreseaux"));
        yield put(setSousReseauxSlice(response.data));
      } catch (error) {
        console.error("Failed to fetch sous réseaux:", error);
      }
    },

    *postSousReseauForm(action) {
      try {
        const response = yield call(() =>
          axios.post(
            "http://localhost:9500/api/sousreseaux",
            action.payload
          )
        );
        if (response.status === 201) {
          yield put(addSousReseauSlice(response.data));
        }
      } catch (error) {
        console.error("Failed to add sous réseau:", error);
      }
    },

    *deleteSousReseau(action) {
      try {
        const response = yield call(() =>
          axios.delete(`http://localhost:9500/api/sousreseaux/${action.payload}`)
        );
        if (response.status === 200) {
          yield put(deleteSousReseauSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to delete sous réseau:", error);
      }
    },

    *updateSousReseau(action) {
      try {
        const response = yield call(() =>
          axios.put(
            `http://localhost:9500/api/sousreseaux/${action.payload.idSousReseau}`,
            action.payload
          )
        );
        if (response.status === 200) {
          console.log('Sous réseau updated successfully');
          yield put(updateSousReseauSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to update sous réseau:", error);
      }
    },
  },
});

export const {
  getSousReseauxList,
  postSousReseauForm,
  deleteSousReseau,
  updateSousReseau,
} = sousReseauSaga.actions;
