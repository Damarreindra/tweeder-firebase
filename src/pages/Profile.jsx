import React, { useEffect } from 'react'
import PagesTemplate from '../components/Template/Pages'
import { useDispatch, useSelector } from 'react-redux';
import { getThread } from '../actions/threadsAction';
import MainCard from '../components/Card/MainCard';
import Jumbotron from '../components/Jumbotron/Jumbotron';

function Profile() {
  const threads = useSelector((state) => state.ThreadsReducer.getThreadResult);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThread());
  }, [dispatch]);
  return (
    <>
    <PagesTemplate>
      <Jumbotron/>
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