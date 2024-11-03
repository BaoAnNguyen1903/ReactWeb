import { configureStore } from '@reduxjs/toolkit';
import artReducer from './artSlice';
import artistReducer from './artistSlice';

const store = configureStore({
  reducer: {
    art: artReducer,
    artist: artistReducer,
  },
});

export default store;
