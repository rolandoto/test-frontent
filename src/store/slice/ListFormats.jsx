import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  entities: [],
  loading: false,
}

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async ({id_hotel}) => {
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/listformats/${id_hotel}`).then(
    (data) => data.json()
  )
  return res
})

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.loading = true
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.entities = payload
    },
    [getPosts.rejected]: (state) => {
      state.loading = false
    },
  },
})


export default postSlice.reducer