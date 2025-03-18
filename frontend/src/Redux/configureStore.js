import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
// import demoSlice from './demoSlice';
import reducerSlice from '../containers/reducerSlice';
import auth from '../containers/authentication/authReducer'
import snackbar from '../containers/snackbarReducerSlice'
import order from '../containers/orderSlice'

export default configureStore({
  reducer: {
    // demo: demoSlice
    dataReducer: reducerSlice,
    auth: auth,
    snackbar: snackbar,
    order: order
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});