import React from 'react'
import PagesTemplate from '../components/Template/Pages'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetailThread } from '../actions/threadsAction';
import MainCard from '../components/Card/MainCard';
import Loader from '../lottie/loading.json'
import Lottie from 'lottie-react';


function DetailPost() {
    const {uid} = useParams()
    const detail = useSelector((state) => state.ThreadsReducer.getDetailThreadResult);
    const dispatch = useDispatch()
    useEffect(()=>{
        if(uid){
            dispatch(getDetailThread(uid))

        }
    },[uid])
console.log(detail);
  return (
    <>
    <PagesTemplate>
    {
        detail ? (<MainCard thread={detail[0]}/> ) : 
        <Lottie animationData={Loader}/>
    }


    </PagesTemplate>
    
    </>
  )
}

export default DetailPost