import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification: (state,action) => {
        return state = action.payload
    }
  }
})

export const {setNotification} = notificationSlice.actions

export const setEventNotification = (notification, timeoutDelay = 10) => {
  return async (dispatch) => {
    const timeout = timeoutDelay * 1000
    dispatch(setNotification(notification)) 
    setTimeout(() => {
      dispatch(setNotification(null))
    }, timeout)
  }
}

export default notificationSlice.reducer