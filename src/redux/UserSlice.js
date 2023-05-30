import { createSlice } from "@reduxjs/toolkit";


// 初始化全域變數
const UserSlice = createSlice({

    name : 'user',
    initialState:{ UserProfile : 'User'},
    reducers:{
        addUserProfile: (state , action) => {
            state.UserProfile = action.payload.UserProfile;

        },
    },



});


export const selectUserProfile = (state) => state.user.UserProfile;

export const {addUserProfile }= UserSlice.actions;

export default UserSlice.reducer;