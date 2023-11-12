import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    selectedPostID:null,
}

const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        updateSelectedPostId: (state, action) => {
            state.selectedPostID = action.payload;
          },
    }
});
export const { updateSelectedPostId } = postSlice.actions;

export default postSlice.reducer;