import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    quote: '',
    author: ''
}


const createNewQuote = (state, action) => {
    state.quote = action.payload.quote;
    state.author = action.payload.author;
}

const quoteMachineSlice = createSlice({
    name: "quote machine",
    initialState: initialState,
    reducers: {
        newQuote: createNewQuote
    }
});

export const {newQuote} = quoteMachineSlice.actions;

export default quoteMachineSlice.reducer;
