import React, { useEffect } from 'react';
import PagesTemplate from '../components/Template/Pages';
import TweedForm from '../components/AddPost';
import MainCard from '../components/Card/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { getThreads } from '../actions/threadsAction';
import Loader from '../lottie/loading.json'
import Lottie from 'lottie-react';

function Home() {
  const threads = useSelector((state) => state.ThreadsReducer.getThreadsResult);
  const refresh = useSelector((state) => state.UserReducer.addPostResult);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThreads());
  }, [refresh]);
  return (
    <PagesTemplate>
      <TweedForm />

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
  );
}

export default Home;
