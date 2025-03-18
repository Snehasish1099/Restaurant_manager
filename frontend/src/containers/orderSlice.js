import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customer: '',
    address: '',
    items: []
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setCustomer: (state, action) => {
            state.customer = action.payload;
        },
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
        clearOrder: (state) => {
            state.customer = '';
            state.address = '';
            state.items = [];
        }
    }
});

export const { setCustomer, setAddress, addItem, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
