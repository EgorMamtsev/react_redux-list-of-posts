import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
    autor : User | null
}

const initialState: AuthorState = {
    autor: null
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.autor = action.payload
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;