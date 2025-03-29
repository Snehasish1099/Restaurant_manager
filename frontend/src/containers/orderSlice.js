import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    address: '',
    items: []
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.item_id === action.payload.item_id);
            if (existingItem) {
                existingItem.quantity = action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.item_id !== action.payload);
        },
        clearOrder: (state) => {
            state.customer = '';
            state.address = '';
            state.items = [];
        }
    }
});

export const { setAddress, addItem, clearOrder, removeItem } = orderSlice.actions;
export default orderSlice.reducer;
