import { configureStore , combineReducers} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { CategoryApplicationSlice } from '../Components/CategoryApplication/CategoryApplicationSlice';
import { appcategoriesSaga } from '../Components/CategoryApplication/categoryApplicationSaga';


const rootReducers = combineReducers({
     appcategorie: CategoryApplicationSlice.reducer,


  });

const rootSagas = function* rootSaga() {
    yield all([
         appcategoriesSaga.saga(),

    ])
}

const sagaMiddleware = createSagaMiddleware(); 

export const store = configureStore({
    reducer: rootReducers,
    middleware:getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false
    }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSagas);
