import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import demoSlice from './demoSlice';

export default configureStore({
  reducer: {
    demo: demoSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});