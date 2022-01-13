import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",

  initialState: {
    isOpen: false,
    data: {},
    type: "",
  },

  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.data = { ...action.payload.data };
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

const { reducer, actions } = modalSlice;
export const { openModal, closeModal } = actions;
export default reducer;
