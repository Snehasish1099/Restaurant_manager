import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
// import demoSlice from './demoSlice';
import reducerSlice from '../containers/reducerSlice';
import auth from '../containers/authentication/authReducer'
import snackbar from '../containers/snackbarReducerSlice'

export default configureStore({
  reducer: {
    // demo: demoSlice
    dataReducer: reducerSlice,
    auth: auth,
    snackbar: snackbar
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});