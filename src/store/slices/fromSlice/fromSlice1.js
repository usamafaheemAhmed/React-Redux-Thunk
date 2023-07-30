import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


let initialState = [{ id: "1", Name: "Usama", FatherName: "Faheem ud din", date: "2023-07-11", gender: "male" },
{ id: "2", Name: "Komail", FatherName: "Abbas", date: "2023-07-18", gender: "male" }]

// let initialState = {
//     Posts: [],
//     Status: "idle",
//     error: null,
// }

// const API = "localhost:3000/Redux";


// export const fetchPosts = createAsyncThunk("Redux thunk Api", async () => {
//     try {
//         let res = await axios.get(API)
//         return [...res.data];
//     }
//     catch (err) {
//         return err.message;
//     }
// })


let formSlice = createSlice({
    name: "Counter",
    initialState,
    reducers: {
        addData: {
            reducer (state, action){
            state.push(action.payload);
            },
            prepare(Name, FatherName, date, gender) {
                return {
                    payload: {
                        id: nanoid(),
                        Name,
                        FatherName,
                        date,
                        gender,
                    }
                } 
            }
            
        },
        deleteData: (state, action) => {
            const index = action.payload;
            return state.filter((item, i) => i !== index);
        },
        updateData: (state, action) => {
            // alert(1);
            const { id, Name, FatherName, date, gender } = action.payload;
            const index = state.findIndex(item => item.id === id);
      
            if (index !== -1) {
              // If the item exists in the state, update its properties
              state[index].Name = Name;
              state[index].FatherName = FatherName;
              state[index].date = date;
              state[index].gender = gender;
            }

            return state;
        },
        AddAttributeData: {
            reducer (state, action){
                let { id, Flag } = action.payload;
                const index = state.findIndex(item => item.id === id);
                if (index !== -1) {
                    // If the item exists in the state, update its properties
                    state[index].Flag = Flag;
                }
            return state;
                
            },
            prepare( Flag, id ) {
                return {
                    payload: {
                        id,
                        Flag
                    }
                } 
            }
            
        },
    }
    // extraReducers(builder) {
    //     builder 
    //         .addCase(fetchPosts.pending, (state, action) => {
    //             state.Status = 'loading'
    //         })
    //         .addCase(fetchPosts.fulfilled, (state, action) => {
    //             state.Status = 'succeeded'
                
    //             const loadedPosts = action.payload.map(post => {
    //                 return post
    //             });
    //             state. = state..concat(loadedPosts)
    //         })
    //         .addCase(fetchPosts.rejected, (state, action) => {
    //             state.Status = 'failed'
    //             state.error = action.error.message
    //         })
    // }
});

// export const { addData } = formSlice.actions;

export const SelectAllFrom = (state) => state.Posts.formData;

export const { addData, deleteData, updateData, AddAttributeData } = formSlice.actions;

export default formSlice.reducer ;