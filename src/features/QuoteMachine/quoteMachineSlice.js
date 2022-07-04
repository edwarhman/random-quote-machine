import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { randomInRange } from "../../utils.js";

const API_KEY="f009c19b69ec55337b60eec3f65e2447";
const initialState = {
    bookIndex: [],
  quote: "",
  author: "",
};

const createNewQuote = (state, action) => {
    const verses = action.payload.text.split(/\r?\n/);
    const idx = randomInRange(verses.length);
    const splited = verses[idx].split(':');
    const ref = splited[0] + ':' + splited[1].match(/\d+/)[0];
    const verse = splited[1].replace(/\d+/,"");
  state.quote = verse;
    state.author = ref;
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
        const response = await fetch(`https://api.biblia.com/v1/bible/contents/RVR60?key=${API_KEY}`);
        return await response.json();
    }
);

export const fetchQuote = createAsyncThunk(
  "quoteMachine/fetchQuote",
  async (verseInfo) => {
      const response = await fetch(`https://api.biblia.com/v1/bible/content/RVR60.text.json?passage=${verseInfo.passage+verseInfo.chapter}&style=oneVersePerLineFullReference&key=${API_KEY}`)
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
