/* eslint-disable import/no-unresolved */

import cartSlice from './cartSlice';
import productSlice from './productSlice';
import userSlice from './userSlice';

const rootReducer = {
  cartSlice,
  productSlice,
  userSlice,
};

export default rootReducer;
