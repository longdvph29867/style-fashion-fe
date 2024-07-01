import { createSlice } from "@reduxjs/toolkit";
import { localTokenService, localUserService } from "../services/localService";
const initialState = {
  userInfo: localUserService.get(),
  userToken: localTokenService.get(),
}
const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload
    },
  },
  });
  
  export const { setUserInfo, setUserToken } = userSlice.actions;
  export default userSlice.reducer;