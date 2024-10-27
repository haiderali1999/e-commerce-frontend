/* eslint-disable no-useless-catch */
/* eslint-disable no-debugger */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, getProductsWithPagination } from '../api/products';

const initialState = {
  data: [],
  loading: 'idle',
  error: null,
};

export const getAllProducts = createAsyncThunk('api/products', async ({ page, pageSize }) => {
  try {
    const response = await getProductsWithPagination(page, pageSize);
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const fetchProducts = createAsyncThunk('api/products-only', async () => {
  try {
    const response = await getProducts();
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
