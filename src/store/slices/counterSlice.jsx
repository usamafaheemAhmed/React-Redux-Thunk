import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let counterSlice = createSlice({
    name: "Counter",
    initialState: { count: sessionStorage.getItem("Counter") ? Number(sessionStorage.getItem("Counter")) : 0 },
    reducers: {
        increment: (state) => {
            state.count += 1;
            sessionStorage.setItem("Counter", state.count);
        },
        decrement: (state) => {

            if (state.count == 0) {
                alert("state is Zero");
            }
            else {
                state.count -= 1;
                sessionStorage.setItem("Counter", state.count);
            }
        },
        amountAdd: (state,action) => {
            state.count += action.payload;
            sessionStorage.setItem("Counter", state.count);
        },
        Reset: (state) => {
            state.count = 0;
            sessionStorage.setItem("Counter", state.count);
        },

    }
});

export const { increment, decrement, amountAdd, Reset } = counterSlice.actions;
export default counterSlice.reducer ;