const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');
const { getSellers } = require('../api/users');

export const fetchSellers = createAsyncThunk('api/sellers', async () => {
  try {
    const response = await getSellers();
    return response?.data;
  } catch (error) {
    return error;
  }
});

const initialState = {
  data: [],
  loading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSellers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSellers.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSellers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default userSlice.reducer;
