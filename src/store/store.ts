import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './feature/product';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
