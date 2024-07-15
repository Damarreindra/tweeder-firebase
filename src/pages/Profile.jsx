import React, { useEffect, useState } from 'react'
import PagesTemplate from '../components/Template/Pages'
import { useDispatch, useSelector } from 'react-redux';
import { getThread } from '../actions/threadsAction';
import MainCard from '../components/Card/MainCard';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import Lottie from 'lottie-react';
import Loader from '../lottie/loading.json'
function Profile() {
  const threads = useSelector((state) => state.ThreadsReducer.getThreadResult);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    dispatch(getThread());
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [dispatch]);
  return (
    <>
    <PagesTemplate>
      <Jumbotron/>
    {threads ? (
        threads.map((thread, index) => (
          <MainCard
            key={index}
            thread={thread}
          />
        ))
      ) : (
        <Lottie animationData={Loader}/>
      )}
    </PagesTemplate>
    </>
  )
}

export default Profile