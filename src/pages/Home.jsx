import React, { useEffect } from 'react';
import PagesTemplate from '../components/Template/Pages';
import TweedForm from '../components/AddPost';
import MainCard from '../components/Card/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { getThreads } from '../actions/threadsAction';

function Home() {
  const threads = useSelector((state) => state.ThreadsReducer.getThreadResult);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThreads());
  }, [dispatch]);
  return (
    <PagesTemplate>
      <TweedForm />

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
  );
}

export default Home;
