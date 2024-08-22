import { put, call } from 'redux-saga/effects';
import axios from "axios";
import { createSliceSaga } from "redux-toolkit-saga";
import { 
    setCategoryServeurSlice, 
    addCategoryServeurSlice, 
    deleteCategoryServeurSlice, 
    updateCategoryServeurSlice 
} from './CategoryServeurSlice';

export const categoryServeurSaga = createSliceSaga({
    name: "categoryServeurSaga",
    caseSagas: {
        *getCategoryServeursList() {
            try {
                const response = yield call(() => axios.get("http://localhost:9500/api/categoryServeurs"));
                yield put(setCategoryServeurSlice(response.data));
            } catch (error) {
                console.error("Erreur lors de la récupération des catégories de serveurs :", error);
            }
        },

        *postCategoryServeurForm(action) {
            try {
                const response = yield call(() =>
                    axios.post(
                        "http://localhost:9500/api/categoryServeurs",
                        action.payload
                    )
                );
                if (response.status === 201) {
                    yield put(addCategoryServeurSlice(response.data));
                }
            } catch (error) {
                console.error("Erreur lors de l'ajout de la catégorie de serveur :", error);
            }
        },

        *deleteCategoryServeur(action) {
            try {
                const response = yield call(() =>
                    axios.delete(`http://localhost:9500/api/categoryServeurs/${action.payload}`)
                );
                if (response.status === 204) {
                    yield put(deleteCategoryServeurSlice(action.payload));
                }
            } catch (error) {
                console.error("Erreur lors de la suppression de la catégorie de serveur :", error);
            }
        },

        *updateCategoryServeur(action) {
            try {
                const response = yield call(() =>
                    axios.put(
                        `http://localhost:9500/api/categoryServeurs/${action.payload.id}`,
                        action.payload
                    )
                );
                if (response.status === 200) {
                    yield put(updateCategoryServeurSlice(action.payload));
                }
            } catch (error) {
                console.error("Erreur lors de la mise à jour de la catégorie de serveur :", error);
            }
        }
    }
});

export const { 
    getCategoryServeursList, 
    postCategoryServeurForm, 
    deleteCategoryServeur, 
    updateCategoryServeur 
} = categoryServeurSaga.actions;
