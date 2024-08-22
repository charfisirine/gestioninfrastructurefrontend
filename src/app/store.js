import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { CategoryApplicationSlice } from '../Components/CategoryApplication/CategoryApplicationSlice';
import { appcategoriesSaga } from '../Components/CategoryApplication/categoryApplicationSaga';
import { CategoryServeurSlice } from '../Components/CategoryServeur/CategoryServeurSlice';
import { categoryServeurSaga } from '../Components/CategoryServeur/categoryServeurSaga';

const rootReducers = combineReducers({
  appcategorie: CategoryApplicationSlice.reducer,
  categoryServeur: CategoryServeurSlice.reducer, // Add the CategoryServeur reducer
});

const rootSagas = function* rootSaga() {
  yield all([
    appcategoriesSaga.saga(),
    categoryServeurSaga.saga(), // Add the CategoryServeur saga
  ]);
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSagas);
