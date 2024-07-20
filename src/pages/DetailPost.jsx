import React from "react";
import PagesTemplate from "../components/Template/Pages";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetailThread } from "../actions/threadsAction";
import DetailCard from "../components/Card/DetailCard";
import NavbarDetailPost from "../components/navbar/NavbarDetailPost";
import CommentForm from "../components/AddComment/CommentForm";
import PageSkeleton from "../components/Skeleton/PageSkeleton";
import ReplyCard from "../components/Card/ReplyCard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useState } from "react";


function DetailPost() {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const detail = useSelector(
    (state) => state.ThreadsReducer.getDetailThreadResult
  );
  const comment = useSelector((state) => state.CommentReducer.addCommentResult);
  const dispatch = useDispatch();
  useEffect(() => {
    if (uid) {
      dispatch(getDetailThread(uid));
    }
  }, [uid]);
  useEffect(() => {
    if (comment) {
      dispatch(getDetailThread(uid));
    }
  }, [comment]);




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
  return (
    <>
      {detail && user ? (
        <PagesTemplate>
          <NavbarDetailPost />
          <DetailCard user={user} thread={detail[0]} />

          <CommentForm uid={uid} />
          {detail[0].comments.length > 0 && (
            detail[0].comments.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map((comment) =>( <ReplyCard thread={comment} />))
          )
          }
        </PagesTemplate>
      ) : (
        <PageSkeleton />
      )}
    </>
  );
}

export default DetailPost;
