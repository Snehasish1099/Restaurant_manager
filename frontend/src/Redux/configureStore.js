import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
// import demoSlice from './demoSlice';
import reducerSlice from '../containers/reducerSlice';

export default configureStore({
  reducer: {
    // demo: demoSlice
    dataReducer: reducerSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});