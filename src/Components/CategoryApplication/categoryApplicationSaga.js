import { put, call } from 'redux-saga/effects';
import axios from "axios"
import { createSliceSaga } from "redux-toolkit-saga"
import { setCategoryApplicationSlice } from './CategoryApplicationSlice';

export const appcategoriesSaga = createSliceSaga({
    name: "appcategoriesSaga",
    caseSagas: {
        *getappcategoriesList(data) {
            const response = yield call(() => axios.get("http://localhost:9500/api/categoryApps"))
            yield put(setCategoryApplicationSlice(response.data))
        },

        *postAppCategoriesForm(action) {
            try {
                const response = yield call(() =>
                    axios.post(
                        "http://localhost:9500/api/categoryApps",
                        action.payload
                    )
                );
                if (response.status === 201) {
                    console.log("...");
                }
            } catch (error) {
                console.log(error);
            }
        },
        *deleteCategory(action) {
            try {
                const response = yield call(() =>
                    axios.delete(`http://localhost:9500/api/categoryApps/${action.payload}`)
                );
                if (response.status === 204) {
                    console.log('Category deleted successfully');
                    yield put(setCategoryApplicationSlice(response.data))                }
            } catch (error) {
                console.error(error);
            }},

            *updateCategory(action) {
                try {
                    const response = yield call(() =>
                        axios.put(
                            `http://localhost:9500/api/categoryApps/${action.payload.id}`,
                            action.payload
                        )
                    );
                    if (response.status === 200) {
                        console.log('Category updated successfully');
                        yield put(getappcategoriesList()); 
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        

    }
})

export const { getappcategoriesList, postAppCategoriesForm,deleteCategory ,updateCategory} = appcategoriesSaga.actions;
