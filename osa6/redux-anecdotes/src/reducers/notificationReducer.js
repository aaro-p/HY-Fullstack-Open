import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification: (state,action) => {
        return state = action.payload
    },
    clearNotification: (state,action) => {
        state = ""
    }
  }
})

export const {setNotification, clearNotification} = notificationSlice.actions
export default notificationSlice.reducer