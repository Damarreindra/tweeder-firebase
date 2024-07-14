import React, { useEffect } from 'react'
import PagesTemplate from '../components/Template/Pages'
import { useDispatch, useSelector } from 'react-redux';
import { getThreads } from '../actions/threadsAction';
import MainCard from '../components/Card/MainCard';

function Profile() {
  const threads = useSelector((state) => state.ThreadsReducer.getThreadResult);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThreads());
  }, [dispatch]);
  return (
    <>
    <PagesTemplate>
    {threads ? (
        threads.map((thread, index) => (
          <MainCard
            key={index}
            content={thread.content}
            author={thread.author}
            createdAt={thread.createdAt}
          />
        ))
      ) : (
        <p>Loading threads...</p>
      )}
    </PagesTemplate>
    </>
  )
}

export default Profile