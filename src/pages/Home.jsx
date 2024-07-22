import React, { useEffect, useState } from "react";
import PagesTemplate from "../components/Template/Pages";
import TweedForm from "../components/AddPost";
import MainCard from "../components/Card/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { getThreads } from "../actions/threadsAction";
import Loader from "../lottie/loading.json";
import Lottie from "lottie-react";
import PageSkeleton from "../components/Skeleton/PageSkeleton";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Flex, useDisclosure } from "@chakra-ui/react";
import NavbarMobile from "../components/navbar/NavbarMobile";

function Home() {
  const threads = useSelector((state) => state.ThreadsReducer.getThreadsResult);
  const refresh = useSelector((state) => state.UserReducer.addPostResult);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(getThreads());
  }, [refresh]);

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

  const sortedThreads = threads ? threads.sort((a,b)=> b.createdAt - a.createdAt) : []

  return (
    <>
      {sortedThreads && user ? (
        <PagesTemplate onOpen={onOpen} isOpen={isOpen} onClose={onClose}>
          <Flex display={{ md: 'none' }}>
            <NavbarMobile user={user} onOpen={onOpen} />
          </Flex>
        
            <TweedForm />
 
          {sortedThreads.map((thread, index) => (
            <MainCard key={index} user={user} thread={thread} />
          ))}
        </PagesTemplate>
      ) : (
        <PageSkeleton />
      )}
    </>
  );
}

export default Home;
