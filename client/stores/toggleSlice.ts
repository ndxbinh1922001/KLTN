import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ToggleState = {
  isPopup: boolean;
  isLoading: boolean;
  result: string;
};

const initialState: ToggleState = {
  isPopup: false,
  isLoading: false,
  result: "",
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    popupAction: (state) => {
      state.isPopup = !state.isPopup;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setResult: (state, action: PayloadAction<string>) => {
      state.result = action.payload;
    },
  },
});

export const { popupAction, setIsLoading,setResult } = toggleSlice.actions;
export default toggleSlice.reducer;
