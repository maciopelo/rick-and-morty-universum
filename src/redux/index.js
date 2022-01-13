import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./slices/charachtersSlice";
import modalReducer from "./slices/modalSlice";
import userReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    characters: charactersReducer,
    modal: modalReducer,
    user: userReducer,
  },
});
