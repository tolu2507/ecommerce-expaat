import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../screen/HomeScreen';

const initialState: Product = {
  category: '',
  description: '',
  id: 0,
  image: '',
  price: 0,
  rating: {
    count: 0,
    rate: 0,
  },
  title: '',
  navigation: null,
};
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product>) => {
      return action.payload;
    },
  },
});

export const {setProducts} = productSlice.actions;
export const getProduct = (state: any) => state.product;
export default productSlice.reducer;
