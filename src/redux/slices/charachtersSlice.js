import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, rejectWithValue } from "@reduxjs/toolkit";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async () => {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    return response.json();
  }
);

export const fetchMoreCharacters = createAsyncThunk(
  "characters/fetchMoreCharacters",
  async (nextPage) => {
    const response = await fetch(nextPage);
    return response.json();
  }
);

export const fetchWithQueryParam = createAsyncThunk(
  "characters/fetchWithQueryParam",
  async (param, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${param}`
      );
      if (response.status === 404)
        return new Promise((resolve, reject) =>
          resolve({ results: [], info: { next: "" } })
        );
      return response.json();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [],
    status: "idle",
    error: null,
    nextPage: "",
  },

  extraReducers(builder) {
    builder
      .addCase(fetchCharacters.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.characters = action.payload.results;
        state.nextPage = action.payload.info.next;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(fetchMoreCharacters.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMoreCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.characters = [...state.characters, ...action.payload.results];
        state.nextPage = action.payload.info.next;
      })
      .addCase(fetchMoreCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(fetchWithQueryParam.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchWithQueryParam.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.characters = [...action.payload.results];
        state.nextPage = action.payload.info.next;
      })
      .addCase(fetchWithQueryParam.rejected, (state, action) => {
        state.status = "failed";
        state.error = true;
      });
  },
});

const { reducer, actions } = charactersSlice;
export const {} = actions;
export default reducer;
