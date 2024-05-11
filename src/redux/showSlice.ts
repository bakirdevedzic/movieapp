import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FethchTopShowsResponse,
  Show,
  initialShowType as initialStateType,
} from "../types/types";
import axios from "axios";

const API_KEY = "20ed5b330941aa4c2592b1af5b8ca46e";

export const fetchTopShowsAsync = createAsyncThunk<
  Show[],
  void,
  { rejectValue: string }
>("show/fetchTopShows", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to fetch shows");
  }
});

export const fetchShowsBySearchAsync = createAsyncThunk<
  Show[],
  string,
  { rejectValue: string }
>("show/fetchShowsBySearch", async (text, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${text}&include_adult=false`
    );
    return response.data.results;
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to fetch movies");
  }
});

export const fetchShowAsync = createAsyncThunk<
  Show,
  number,
  { rejectValue: string }
>("movie/fetchShow", async (id, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to fetch show");
  }
});

const initialState: initialStateType = {
  topShows: [],
  currentShow: null,
  fetchedShows: [],
  status: "idle",
  error: "",
};

const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopShowsAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchTopShowsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topShows = action.payload;
      })
      .addCase(fetchTopShowsAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      })
      .addCase(fetchShowsBySearchAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchShowsBySearchAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fetchedShows = action.payload;
      })
      .addCase(fetchShowsBySearchAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      })
      .addCase(fetchShowAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchShowAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentShow = action.payload;
      })
      .addCase(fetchShowAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      });
  },
});

export default showSlice.reducer;
