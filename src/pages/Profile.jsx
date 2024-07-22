import React, { useEffect, useState } from "react";
import PagesTemplate from "../components/Template/Pages";
import { useDispatch, useSelector } from "react-redux";
import { getThread, getThreads } from "../actions/threadsAction";
import MainCard from "../components/Card/MainCard";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import Lottie from "lottie-react";
import Loader from "../lottie/loading.json";
import NavbarProfile from "../components/navbar/NavbarProfile";
import ProfileCard from "../components/Card/ProfileCard";
import PageSkeleton from "../components/Skeleton/PageSkeleton";
import JumbotronSkeleton from "../components/Skeleton/JumbotronSkeleton";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../firebase";
import StaticNavbarProfile from "../components/navbar/StaticNavbarProfile";

function Profile() {
  const threads = useSelector((state) => state.ThreadsReducer.getThreadResult);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    dispatch(getThreads());
  
  }, [dispatch]);

  useEffect(() => {
    dispatch(getThread());
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUser({ user, ...userDoc.data() });
        } else {
          setUser(user);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const sortedThreads = threads ? threads.sort((a,b)=>b.createdAt - a.createdAt) : []

  return (
    <>
      {loading ? (
        <PageSkeleton />
      ) : (
        <PagesTemplate>
            {sortedThreads.length > 0 ? (
            <NavbarProfile user={user} thread={threads} />
          ) : (
            <StaticNavbarProfile />
          )}
         
          <Jumbotron user={user} />
          {sortedThreads.length > 0 ? (
            sortedThreads.map((thread, index) => (
              <ProfileCard key={index} user={user} thread={thread} />
            ))
          ) : (
           ""
          )}
        </PagesTemplate>
      )}
    </>
  );
}

export default Profile;
