import { createSlice } from "@reduxjs/toolkit";


const initialState = { cartItems:[]  };
const cartSlice  = createSlice({

    name : 'cart',
    initialState,
    reducers:{
        
        addCartItems: ( state ,action) => {
        
            const item = action.payload;
            const product = state.cartItems.find( (x) => x.name === item.name );

            if( !!product ){
            
                const cartItems = state.cartItems.map( (x) => x.name === product.name ? item : x ) ;
                state.cartItems = cartItems;
            }
            else{
                state.cartItems = [...state.cartItems , item];
            
            }

        } , 
        removeCartItems: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x.name !== action.payload);
        },
    
    },


})


export const selectCartItems = ( state ) => state.cart.cartItems;

export const { addCartItems, removeCartItems} = cartSlice.actions;

export default cartSlice.reducer;