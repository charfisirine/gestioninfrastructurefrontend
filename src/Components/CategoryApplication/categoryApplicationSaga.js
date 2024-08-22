import { put, call } from 'redux-saga/effects';
import axios from "axios"
import { createSliceSaga } from "redux-toolkit-saga"
import { addCategorySlice, deleteCategorySlice, setCategoryApplicationSlice, updateCategorySlice } from './CategoryApplicationSlice';

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
                    yield put(addCategorySlice(response.data))
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
                if (response.status === 200) {
                    yield put(deleteCategorySlice(action.payload))                }
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
                        yield put(updateCategorySlice(action.payload)); 
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        

    }
})

export const { getappcategoriesList, postAppCategoriesForm,deleteCategory ,updateCategory} = appcategoriesSaga.actions;
