import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { STRAPI_URL } from "../../config/api";

export const loginUser = createAsyncThunk(
  "user/login",

  async ({ login, password }, thunkAPI) => {
    try {
      const body = JSON.stringify({ identifier: login, password: password });
      const response = await fetch(`${STRAPI_URL}/auth/local/`, {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      const user = {
        commentsCount: data.user.comments.length,
        email: data.user.email,
        login: data.user.username,
        favourites: data.user.favourites,
        token: data.user.jwt,
      };

      if (response.status === 200) {
        localStorage.setItem("jwt", data.jwt);
        return { ...user };
      } else return thunkAPI.rejectWithValue();
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",

  async ({ login, email, password }, thunkAPI) => {
    try {
      const body = JSON.stringify({
        username: login,
        email: email,
        password: password,
      });
      const response = await fetch(`${STRAPI_URL}/auth/local/register`, {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        return;
      } else
        return thunkAPI.rejectWithValue(data.message[0].messages[0].message);
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const authUser = createAsyncThunk(
  "user/auth",

  async (jwt, thunkAPI) => {
    try {
      const response = await fetch(`${STRAPI_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "*/*",
        },
      });

      const data = await response.json();

      const user = {
        commentsCount: data.comments.length,
        email: data.email,
        login: data.username,
        favourites: data.favourites,
        token: jwt,
      };

      if (response.status === 200) {
        return { ...user };
      } else return thunkAPI.rejectWithValue();
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",

  initialState: {
    user: null,
    status: "idle",
    resMessage: "",
    isLogged: false,
  },

  reducers: {
    clearMessageAndStatus: (state) => {
      state.errorMessage = "";
      state.status = "idle";
    },

    clearState: (state) => {
      state.user = null;
      state.status = "idle";
      state.resMessage = "";
      state.isLogged = false;
    },

    addToFavourites: (state, action) => {
      state.user.favourites = [...state.user.favourites, action.payload];
    },

    deleteFromFavourites: (state, action) => {
      state.user.favourites = state.user.favourites.filter(
        (fav) => action.payload !== fav.id
      );
    },
  },

  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLogged = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.resMessage = "Incorrect login or email.";
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.resMessage = "Your account has been created.";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.resMessage = action.payload;
      })
      .addCase(authUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLogged = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.status = "failed";
        state.resMessage = action.payload;
      });
  },
});

const { reducer, actions } = userSlice;
export const {
  clearMessageAndStatus,
  clearState,
  addToFavourites,
  deleteFromFavourites,
} = actions;
export default reducer;
