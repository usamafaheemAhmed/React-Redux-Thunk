import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    Posts: [],
    Status: "idle",
    Error: null,
}
const API = "http://localhost:3000/Redux";



export const fetchPosts = createAsyncThunk("Redux/thunk/Api", async () => {
    try {
        let res = await axios.get(API)
        // console.log("Api Response=" + res);
        return [...res.data];
    }
    catch (err) {
        return err.message;
    }
})

export const PostData = createAsyncThunk("Redux/postData", async (initialPost) => {
    try {
        let data = {
            id: nanoid(),
            Name:initialPost.Name,
            FatherName:initialPost.FatherName,
            date:initialPost.date,
            gender:initialPost.gender,
        }
        let res = await axios.post(API, data);
        // console.log("Api Response=" + res);
        return res.data
    }
    catch (err) {
        return err.message;
    }
})

export const UpdateAxiosData  = createAsyncThunk("Redux/UpdateAxiosData", async (initialPost) => {
    try {
        const res = await axios.patch(`${API}/${initialPost.id}`, initialPost);
        return res.data;
    } catch (err) {
        throw err;
    }
})

export const DeleteDataAxios = createAsyncThunk("Redux/deleteDataAxios", async (postId) => {
    try {
      const res = await axios.delete(`${API}/${postId}`);
      return res.data;
    } catch (err) {
      throw err;
    }
});
  
export const UpdateFlagAxiosData = createAsyncThunk("Redux/UpdateFlagAxiosData", async (data) => {
    try {
        // console.log(data);
        const res = await axios.patch(`${API}/${data.id}`, {Flag:data.Flag} );
        let { id, Flag } = data;
        return { id, Flag };
    } catch (err) {
        throw err;
    }
});

let formSlice = createSlice({
    name: "Counter",
    initialState,
    reducers: {
        addData: {
            reducer (state, action){
            state.Posts.push(action.payload);
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
            return state.Posts.filter((item, i) => i !== index);
        },
        updateData: (state, action) => {
            // alert(1);
            const { id, Name, FatherName, date, gender } = action.payload;
            const index = state.Posts.findIndex(item => item.id === id);
      
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
                const index = state.Posts.findIndex(item => item.id === id);
                alert(index);
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
    },
    extraReducers(builder) {
        builder 
            .addCase(fetchPosts.pending, (state, action) => {
                state.Status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.Status = 'succeeded'
                const loadedPosts = action.payload
                state.Posts = state.Posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.Status = 'failed'
                state.Error = action.error.message
            })
            .addCase(PostData.fulfilled, (state, action) => {
                // console.warning("PostData.fulfilled" + action.payload);
                state.Posts.push(action.payload);
            })
            //Delete
            .addCase(DeleteDataAxios.pending, (state, action) => {
                // state.Posts = action.payload;
                state.Status = 'loading'
            })
            .addCase(DeleteDataAxios.fulfilled, (state, action) => {
                state.Posts = [];
                state.Status = 'succeeded'
            })
            .addCase(DeleteDataAxios.rejected, (state, action) => {
                // state.Posts = action.payload;
                state.Status = 'succeeded'
            })
            //Update
            .addCase(UpdateAxiosData.pending, (state, action) => {
                state.Status = 'loading';
            })
            .addCase(UpdateAxiosData.fulfilled, (state, action) => {
                state.Status = 'succeeded';
                // Update the state to reflect the changes made by the update
                const updatedPost = action.payload;
                const index = state.Posts.findIndex(post => post.id === updatedPost.id);
                if (index !== -1) {
                    state.Posts[index] = updatedPost;
                }
            })
            .addCase(UpdateAxiosData.rejected, (state, action) => {
                state.Status = 'failed';
                state.Error = action.error.message;
            })
            //adding Flag
            .addCase(UpdateFlagAxiosData.fulfilled, (state, action) => {
                const { id, Flag } = action.payload;
                const index = state.Posts.findIndex(item => item.id === id);
                if (index !== -1) {
                    state.Posts[index].Flag = Flag;
                }
            })
    }
});

// export const { addData } = formSlice.actions;

export const SelectAllFrom = (state) => state.formData.Posts;
export const getPostStatus = (state) => state.formData.Status;
export const StateErrors = (state) => state.formData.Error;



export const { addData, deleteData, updateData, AddAttributeData } = formSlice.actions;

export default formSlice.reducer ;