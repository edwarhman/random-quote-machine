import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  quote: "",
  author: "",
};

const createNewQuote = (state, action) => {
  state.quote = action.payload.content;
  state.author = action.payload.author;
};

export const fetchQuote = createAsyncThunk(
  "quoteMachine/fetchQuote",
  async () => {
    const response = await fetch("https://api.quotable.io/random");
    return await response.json();
  }
);

const quoteMachineSlice = createSlice({
  name: "quote machine",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchQuote.fulfilled, createNewQuote);
  },
});

export default quoteMachineSlice.reducer;
