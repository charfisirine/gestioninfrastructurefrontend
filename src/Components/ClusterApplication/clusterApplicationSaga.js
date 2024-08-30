import { put, call } from 'redux-saga/effects';
import axios from "axios";
import { createSliceSaga } from "redux-toolkit-saga";
import {
    setClusterApplicationSlice,
    addClusterApplicationSlice,
    deleteClusterApplicationSlice,
    updateClusterApplicationSlice,
} from './ClusterApplicationSlice';

export const clusterApplicationSaga = createSliceSaga({
    name: "clusterApplicationSaga",
    caseSagas: {
        *getClusterApplicationList() {
            try {
                const response = yield call(() => axios.get("http://localhost:9500/api/clusterApplications"));
                yield put(setClusterApplicationSlice(response.data));
            } catch (error) {
                console.error("Error fetching cluster applications:", error);
            }
        },

        *postClusterApplicationForm(action) {
            try {
                const response = yield call(() =>
                    axios.post(
                        "http://localhost:9500/api/clusterApplications",
                        action.payload
                    )
                );
                if (response.status === 201) {
                    yield put(addClusterApplicationSlice(response.data));
                }
            } catch (error) {
                console.error("Error posting cluster application:", error);
            }
        },

        *deleteClusterApplication(action) {
            try {
                const response = yield call(() =>
                    axios.delete(`http://localhost:9500/api/clusterApplications/${action.payload}`)
                );
                if (response.status === 200) {
                    yield put(deleteClusterApplicationSlice(action.payload));
                }
            } catch (error) {
                console.error("Error deleting cluster application:", error);
            }
        },

        *updateClusterApplication(action) {
            try {
                const response = yield call(() =>
                    axios.put(
                        `http://localhost:9500/api/clusterApplications/${action.payload.id}`,
                        action.payload
                    )
                );
                if (response.status === 200) {
                    yield put(updateClusterApplicationSlice(response.data));
                }
            } catch (error) {
                console.error("Error updating cluster application:", error);
            }
        }
    },
});

export const {
    getClusterApplicationList,
    postClusterApplicationForm,
    deleteClusterApplication,
    updateClusterApplication,
} = clusterApplicationSaga.actions;

export default clusterApplicationSaga;
