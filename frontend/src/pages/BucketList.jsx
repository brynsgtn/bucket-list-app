import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import Header from '../components/Header';

const BucketList = () => {
const { userInfo } = useSelector((state) => state.auth);

useEffect(() => {
    console.log(userInfo)
}, [userInfo])
  return (
    <>
    <Header />
    <div>BucketList</div>
    </>

  )
}

export default BucketList;