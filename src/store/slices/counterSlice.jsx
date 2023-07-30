import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let counterSlice = createSlice({
    name: "Counter",
    initialState: { count: 0},
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {

            if (state.count == 0) {
                alert("state is Zero");
            }
            else {
                state.count -= 1;
            }
        },
        amountAdd: (state,action) => {
            state.count += action.payload ;
        },
        Reset: (state) => {
            state.count = 0;
        },

    }
});

export const { increment, decrement, amountAdd, Reset } = counterSlice.actions;
export default counterSlice.reducer ;