import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  booking: [],
  loading: true,
  status:"booking",
  maintenance:[],
  forget: [],
  emegrcies: [],
  entities: [],
}

export const getBooking = createAsyncThunk(
  'posts/getBooking',
  async ({id}) => {
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/listbooking/${id}`).then(
    (data) => data.json()
  )
  return res
})

export const getPostMaintenance = createAsyncThunk(
  'posts/getPostMaintenance',
  async ({id}) => {
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/listMaintenance/${id}`).then(
    (data) => data.json()
  )
  return res
})



export const Forget = createAsyncThunk(
  'posts/Forget',
  async () => {
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/forgetfulnes`).then(
    (data) => data.json()
  )
  return res
})

export const addPostInsertForget = createAsyncThunk("posts/addPostInsertForget",({id_hotel,id_user,description,ubicacion}) => {
     
  return   fetch(`${process.env.REACT_APP_API_KEY}/api/forgetfulnesinsert`,
    {
      method:'POST',
      headers:{
          'Content-type':'application/json'
      },
      body: JSON.stringify({id_hotel,id_user,description,ubicacion})
  }).then(resp =>{
      if(!resp.ok) throw new Error('Response is not ok')
      return resp.json()
  }).then(resp=>{
       return resp
  })

}
)



export const getEmercies = createAsyncThunk(
  'posts/getEmercies',
  async () => {
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/numberemergencies`).then(
    (data) => data.json()
  )
  return res
})

export const updatePostmaintenance = createAsyncThunk("posts/updatePostmaintenance",({id,options}) => {
     
  return fetch(`${process.env.REACT_APP_API_KEY}/api/updatemaintenance/${id}`,
    {
      method:'POST',
      headers:{
          'Content-type':'application/json'
      },
      body: JSON.stringify({options})
  }).then(resp =>{
      if(!resp.ok) throw new Error('Response is not ok')
      return resp.json()
  }).then(resp=>{
       return resp
  })

}
)

export const addPostMaintenance = createAsyncThunk("posts/addPostMaintenance",({id_hotel,id_user_recepcion,id_user_mantenimiento,room,novelty}) => {
     
  return   fetch(`${process.env.REACT_APP_API_KEY}/api/insertmaintenance`,
    {
      method:'POST',
      headers:{
          'Content-type':'application/json'
      },
      body: JSON.stringify({id_hotel,id_user_recepcion,id_user_mantenimiento,room,novelty})
  }).then(resp =>{
      if(!resp.ok) throw new Error('Response is not ok')
      return resp.json()
  }).then(resp=>{
       return resp
  })

}
)


export const getFormat = createAsyncThunk(
  'posts/getFormat',
  async ({id_hotel}) => {
    const res = await fetch(`${process.env.REACT_APP_API_KEY}/api/listformats/${id_hotel}`).then(
    (data) => data.json()
  )
  return res
})


export const BookingtSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: {
    [getBooking.pending]: (state) => {
      state.status ="loading"
    },
    [getBooking.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded'
      state.booking = payload
    },
    [getBooking.rejected]: (state) => {
      state.status = 'failed'
    },
    [getPostMaintenance.fulfilled]: (state,{payload}) => {
      state.maintenance = payload
    },
    [Forget.fulfilled]: (state,{payload}) => {
      state.forget= payload
    },
    [addPostInsertForget.fulfilled]: (state,{payload}) => {
      console.log("exictoso")
    },
    [getEmercies.fulfilled]: (state,{payload}) => {
      state.emegrcies= payload
    },
    [updatePostmaintenance.fulfilled]: (state,{payload}) => {
        console.log("exictoso")
    },
    [addPostMaintenance.fulfilled]: (state,{payload}) => {
      console.log("exictoso")
  },
  [getFormat.fulfilled]: (state,{payload}) => {
    state.entities = payload
},
  },
})

export default BookingtSlice.reducer