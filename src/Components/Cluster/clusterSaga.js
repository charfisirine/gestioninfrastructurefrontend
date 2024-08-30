import { put, call } from 'redux-saga/effects';
import axios from "axios";
import { createSliceSaga } from "redux-toolkit-saga";
import { 
  setClusterList, 
  addClusterSlice, 
  deleteClusterSlice, 
  updateClusterSlice 
} from './ClusterSlice';

export const clusterSaga = createSliceSaga({
  name: "clusterSaga",
  caseSagas: {
    *getClustersList(action) {
      const response = yield call(() => axios.get("http://localhost:9500/api/clusters"));
      yield put(setClusterList(response.data));
    },

    *postClusterForm(action) {
      try {
        const response = yield call(() =>
          axios.post("http://localhost:9500/api/clusters", action.payload)
        );
        if (response.status === 201) {
          yield put(addClusterSlice(response.data));
        }
      } catch (error) {
        console.error(error);
      }
    },

    *deleteCluster(action) {
      try {
        const response = yield call(() =>
          axios.delete(`http://localhost:9500/api/clusters/${action.payload}`)
        );
        if (response.status === 200) {
          yield put(deleteClusterSlice(action.payload));
        }
      } catch (error) {
        console.error(error);
      }
    },

    *updateCluster(action) {
      try {
        const response = yield call(() =>
          axios.put(`http://localhost:9500/api/clusters/${action.payload.id}`, action.payload)
        );
        if (response.status === 200) {
          yield put(updateClusterSlice(action.payload));
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export const { getClustersList, postClusterForm, deleteCluster, updateCluster } = clusterSaga.actions;
