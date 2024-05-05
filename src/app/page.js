'use client'
import { useDispatch, useSelector } from 'react-redux'
import { setContact } from '@/store/slices/bill'
export default function Home() {
  const dispatch = useDispatch()
  return (
    <div>
      <h1>Home Page</h1>
      <div>{useSelector((state) => state.bill.contact)}</div>
      <div onClick={()=>dispatch(setContact(123123))}>点击</div>
    </div>
  )
}
