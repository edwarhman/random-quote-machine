import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY="f009c19b69ec55337b60eec3f65e2447";
const initialState = {
    bookIndex: [],
  quote: "",
  author: "",
};

const createNewQuote = (state, action) => {
  state.quote = action.payload.content;
  state.author = action.payload.author;
};

const setIndex = (state, action) => {
    state.bookIndex = action.payload.books;
};

export const selectQuote = (state) => {
  return state;
};

export const fetchIndex = createAsyncThunk(
    "quoteMachine/fetchIndex",
    async ()=> {
        const response = await fetch(`https://api.biblia.com/v1/bible/contents/LEB?key=${API_KEY}`);
        return await response.json();
    }
);

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
      builder.addCase(fetchIndex.fulfilled, setIndex);
  },
});

export default quoteMachineSlice.reducer;
