import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    posts: []
}

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, { rejectWithValue, dispatch }) => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts')     
        dispatch(setPosts(res.data))
    })

export const deletePostById = createAsyncThunk(
    'post/deletePostById',
    async (id, { rejectWithValue, dispatch }) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        dispatch(deletePost(id))
    })
     

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts:(state, action )=> {
            state.posts = action.payload
        },
        deletePost:(state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload)
        },
    },

   
    

    extraReducers: (builder) => {
        builder
            .addCase(getPosts.fulfilled, () => console.log('getPosts fulfilled')) // запит відбувся  успішно
            .addCase(getPosts.pending, () => console.log('getPosts pending')) // початок  запиту
            .addCase(getPosts.rejected, () => console.log('getPosts rejected')) // у разі помилки
            .addCase(deletePostById.fulfilled, () => console.log('deletePost fulfilled')) // запит відбувся  успішно
            .addCase(deletePostById.pending, () => console.log('deletePost pending')) // початок  запиту
            .addCase(deletePostById.rejected, () => console.log('deletePost rejected')) // у разі помилки
    }
})


export const { setPosts, deletePost } = postSlice.actions
export default postSlice.reducer

