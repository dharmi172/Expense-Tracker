import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    categories:[],
    transaction:[]
}

export const expenseSlice = createSlice({
    name:'expense',
    initialState,
    reducers: {
        getTranscation:(state)=>{
            //get trnsaction
        }
    }

})

export const{getTranscation} = expenseSlice.actions;
export default expenseSlice.reducer;