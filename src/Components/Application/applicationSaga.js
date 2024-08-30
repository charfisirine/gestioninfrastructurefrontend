import { put, call } from 'redux-saga/effects';
import axios from "axios";
import { createSliceSaga } from "redux-toolkit-saga";
import { addApplicationSlice, deleteApplicationSlice, setApplicationSlice, updateApplicationSlice } from './ApplicationSlice';

export const applicationsSaga = createSliceSaga({
    name: "applicationsSaga",
    caseSagas: {
        *getApplicationList() {
            const response = yield call(() => axios.get("http://localhost:9500/api/applications"));
            yield put(setApplicationSlice(response.data));
        },

        *postApplicationForm(action) {
            try {
                const response = yield call(() =>
                    axios.post(
                        "http://localhost:9500/api/applications",
                        action.payload
                    )
                );
                if (response.status === 201) {
                    yield put(addApplicationSlice(response.data));
                }
            } catch (error) {
                console.log(error);
            }
        },

        *deleteApplication(action) {
            try {
                const response = yield call(() =>
                    axios.delete(`http://localhost:9500/api/applications/${action.payload}`)
                );
                if (response.status === 200) {
                    yield put(deleteApplicationSlice(action.payload));
                }
            } catch (error) {
                console.error(error);
            }
        },

        *updateApplication(action) {
            try {
                const response = yield call(() =>
                    axios.put(
                        `http://localhost:9500/api/applications/${action.payload.id}`,
                        action.payload
                    )
                );
                if (response.status === 200) {
                    yield put(updateApplicationSlice(action.payload));
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
});

export const { getApplicationList, postApplicationForm, deleteApplication, updateApplication } = applicationsSaga.actions;
export default applicationsSaga.reducer;
