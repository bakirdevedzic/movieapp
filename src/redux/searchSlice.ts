import { createSlice } from "@reduxjs/toolkit";
import { initialStateShowType } from "../types/types";

const initialState: initialStateShowType = {
  search: "",
  tab: "show",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearch(state, action) {
      state.search = action.payload.search;
      state.tab = action.payload.tab;
    },
  },
});

export const { changeSearch } = searchSlice.actions;

export default searchSlice.reducer;
