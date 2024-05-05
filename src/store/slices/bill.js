import { createSlice } from '@reduxjs/toolkit'

export const BillSlice = createSlice({
  name: 'bill',
  initialState: {
    contact: '111',
    addressInfo: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      country: 'United States',
    },
    paymentMethod: 'Credit Card',
    totalPrice: 0
  },
  reducers: {
    setContact: (state, action) => {
      state.contact = action.payload
    },
    setAddressInfo: (state, action) => {
      state.addressInfo = action.payload
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload
    }
  }
})

export const {setContact, setAddressInfo, setPaymentMethod, setTotalPrice } = BillSlice.actions
export default BillSlice.reducer