import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArt = createAsyncThunk('art/fetchArt', async () => {
  const response = await axios.get('http://localhost:5000/art');
  return response.data;
});

export const addArt = createAsyncThunk('art/addArt', async (newArt) => {
  const response = await axios.post('http://localhost:5000/art', newArt);
  return response.data;
});

export const updateArt = createAsyncThunk('art/updateArt', async (updatedArt) => {
  const response = await axios.put(`http://localhost:5000/art/${updatedArt.id}`, updatedArt);
  return response.data;
});

export const deleteArt = createAsyncThunk('art/deleteArt', async (id) => {
  await axios.delete(`http://localhost:5000/art/${id}`);
  return id;
});

const artSlice = createSlice({
  name: 'art',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArt.fulfilled, (state, action) => action.payload)
      .addCase(addArt.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateArt.fulfilled, (state, action) => {
        const index = state.findIndex((art) => art.id === action.payload.id);
        state[index] = action.payload;
      })
      .addCase(deleteArt.fulfilled, (state, action) => {
        return state.filter((art) => art.id !== action.payload);
      });
  },
});

export default artSlice.reducer;
