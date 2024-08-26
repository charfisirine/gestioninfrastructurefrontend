import { put, call } from 'redux-saga/effects';
import axios from "axios";
import { createSliceSaga } from "redux-toolkit-saga";
import { addSiteSlice, deleteSiteSlice, setSiteSlice, updateSiteSlice } from './siteSlice';

export const sitesSaga = createSliceSaga({
    name: "sitesSaga",
    caseSagas: {
        *getsitesList() {
            const response = yield call(() => axios.get("http://localhost:9500/api/sites"));
            yield put(setSiteSlice(response.data));
        },

        *postSitesForm(action) {
            try {
                const response = yield call(() =>
                    axios.post("http://localhost:9500/api/sites", action.payload)
                );
                if (response.status === 201) {
                    yield put(addSiteSlice(response.data));
                }
            } catch (error) {
                console.log(error);
            }
        },

        *deleteSite(action) {
            try {
                const response = yield call(() =>
                    axios.delete(`http://localhost:9500/api/sites/${action.payload}`)
                );
                if (response.status === 200) {
                    yield put(deleteSiteSlice(action.payload));
                }
            } catch (error) {
                console.error(error);
            }
        },

        *updateSite(action) {
            try {
                const response = yield call(() =>
                    axios.put(`http://localhost:9500/api/sites/${action.payload.id}`, action.payload)
                );
                if (response.status === 200) {
                    yield put(updateSiteSlice(response.data));
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
});

export const { getsitesList, postSitesForm, deleteSite, updateSite } = sitesSaga.actions;
export default sitesSaga;
