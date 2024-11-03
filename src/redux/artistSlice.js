import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArtists = createAsyncThunk('artist/fetchArtists', async () => {
  const response = await axios.get('http://localhost:5000/artist');
  return response.data;
});

export const addArtist = createAsyncThunk('artist/addArtist', async (newArtist) => {
  const response = await axios.post('http://localhost:5000/artist', newArtist);
  return response.data;
});

export const updateArtist = createAsyncThunk('artist/updateArtist', async (updatedArtist) => {
  const response = await axios.put(`http://localhost:5000/artist/${updatedArtist.id}`, updatedArtist);
  return response.data;
});

export const deleteArtist = createAsyncThunk('artist/deleteArtist', async (id) => {
  await axios.delete(`http://localhost:5000/artist/${id}`);
  return id;
});

const artistSlice = createSlice({
  name: 'artist',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.fulfilled, (state, action) => action.payload)
      .addCase(addArtist.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateArtist.fulfilled, (state, action) => {
        const index = state.findIndex((artist) => artist.id === action.payload.id);
        state[index] = action.payload;
      })
      .addCase(deleteArtist.fulfilled, (state, action) => {
        return state.filter((artist) => artist.id !== action.payload);
      });
  },
});

export default artistSlice.reducer;
