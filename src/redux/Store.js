import {configureStore} from '@reduxjs/toolkit';
import UserProfileReducer from './UserSlice';
import UserCartItems from "./CartSlice";

const Store = configureStore({

    reducer:{
        user : UserProfileReducer,
        cart : UserCartItems,
    },
    devTools: process.env.NODE_ENV !== 'production',

});

export default Store;


// 取得變數

// *  useSelector(selectUserProfile)
// import { selectUserProfile } from '../redux/UserSlice';