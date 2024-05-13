import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Cast,
  Movie,
  initialMovieStateType as initialStateType,
} from "../types/types";
import axios from "axios";
import { getTrailerKeyFromResponse } from "../utils/helpers";

const API_KEY = "20ed5b330941aa4c2592b1af5b8ca46e";

export const fetchTopMoviesAsync = createAsyncThunk<
  Movie[],
  void,
  { rejectValue: string }
>("movie/fetchTopMovies", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    );
    return response.data.results.slice(0, 10);
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to fetch movies");
  }
});

export const fetchMoviesBySearchAsync = createAsyncThunk<
  Movie[],
  string,
  { rejectValue: string }
>("movie/fetchMoviesBySearch", async (text, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${text}&page=1&include_adult=false`
    );
    return response.data.results.slice(0, 10);
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to fetch movies");
  }
});

export const fetchMovieAsync = createAsyncThunk<
  Movie,
  number,
  { rejectValue: string }
>("movie/fetchMovie", async (id, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to fetch movie");
  }
});

export const fetchTrailerKeyAsync = createAsyncThunk<
  string,
  number,
  { rejectValue: string }
>("movie/fetchTrailerKey", async (id, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    );

    const trailerKey = getTrailerKeyFromResponse(response.data.results);
    return trailerKey;
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to fetch trailer key");
  }
});

export const fetchMovieCreditsAsync = createAsyncThunk<
  Cast[],
  number,
  { rejectValue: string }
>("movie/fetchCredits", async (id, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    return response.data.cast.slice(0, 6);
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to fetch movie credits");
  }
});

export const fetchRecommendedMovies = createAsyncThunk<
  Movie[],
  number,
  { rejectValue: string }
>("movie/fetchRecommended", async (id, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`
    );

    return response.data.results.slice(0, 6);
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to fetch movie recommended");
  }
});

const initialState: initialStateType = {
  topMovies: [],
  currentMovie: null,
  fetchedMovies: [],
  status: "succeeded",
  error: "",
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopMoviesAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchTopMoviesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topMovies = action.payload;
      })
      .addCase(fetchTopMoviesAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      })
      .addCase(fetchMoviesBySearchAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchMoviesBySearchAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fetchedMovies = action.payload;
      })
      .addCase(fetchMoviesBySearchAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      })
      .addCase(fetchMovieAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchMovieAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      })
      .addCase(fetchTrailerKeyAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchTrailerKeyAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentMovie = state.currentMovie
          ? { ...state.currentMovie, trailer: action.payload }
          : null;
      })
      .addCase(fetchMovieCreditsAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchMovieCreditsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentMovie = state.currentMovie
          ? { ...state.currentMovie, cast: action.payload }
          : null;
      })
      .addCase(fetchMovieCreditsAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      })
      .addCase(fetchRecommendedMovies.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchRecommendedMovies.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.currentMovie = state.currentMovie
          ? { ...state.currentMovie, recommended: action.payload }
          : null;
      })
      .addCase(fetchRecommendedMovies.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      });
  },
});

export default movieSlice.reducer;
