import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FethchTopShowsResponse,
  Show,
  initialShowType as initialStateType,
} from "../types/types";
import axios from "axios";
import { getTrailerKeyFromResponse } from "../utils/helpers";

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
    return response.data.results.slice(0, 10);
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
    return response.data.results.slice(0, 10);
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to fetch movies");
  }
});

export const fetchShowAsync = createAsyncThunk<
  any,
  number,
  { rejectValue: string }
>("movie/fetchShow", async (id, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
    );
    const show = {
      ...response.data,
      runtime: response.data.episode_run_time[0],
      title: response.data.name,
      release_date: response.data.first_air_date,
    };
    console.log("show", show);
    return show;
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to fetch show");
  }
});

export const fetchTrailerKeyAsync = createAsyncThunk<
  string,
  number,
  { rejectValue: string }
>("show/fetchTrailerKey", async (id, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=en-US`
    );

    const trailerKey = getTrailerKeyFromResponse(response.data.results);
    return trailerKey;
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to fetch trailer key");
  }
});

export const fetchShowCreditsAsync = createAsyncThunk<
  any,
  number,
  { rejectValue: string }
>("show/fetchCredits", async (id, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    return response.data.cast.slice(0, 6);
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to fetch show credits");
  }
});

export const fetchRecommendedShowsAsync = createAsyncThunk<
  Show[],
  number,
  { rejectValue: string }
>("show/fetchRecommended", async (id, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}`
    );
    const recommended = response.data.results
      .slice(0, 6)
      .map((object: Show) => {
        return {
          ...object,
          title: object.name,
          release_date: object.first_air_date,
        };
      });
    return recommended;
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to fetch recommended shows");
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
      })
      .addCase(fetchTrailerKeyAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchTrailerKeyAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentShow = state.currentShow
          ? { ...state.currentShow, trailer: action.payload }
          : null;
      })
      .addCase(fetchTrailerKeyAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      })
      .addCase(fetchShowCreditsAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchShowCreditsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentShow = state.currentShow
          ? { ...state.currentShow, cast: action.payload }
          : null;
      })
      .addCase(fetchShowCreditsAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      })
      .addCase(fetchRecommendedShowsAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchRecommendedShowsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentShow = state.currentShow
          ? { ...state.currentShow, recommended: action.payload }
          : null;
      })
      .addCase(fetchRecommendedShowsAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      });
  },
});

export default showSlice.reducer;
