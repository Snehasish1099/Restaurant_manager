import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
// import demoSlice from './demoSlice';
import reducerSlice from '../containers/reducerSlice';
import auth from '../containers/authentication/authReducer'

export default configureStore({
  reducer: {
    // demo: demoSlice
    dataReducer: reducerSlice,
    auth: auth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});