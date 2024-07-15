import {
  doc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import app from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export const GET_THREADS = "GET_THREADS";
export const GET_THREAD = "GET_THREAD";
export const GET_DETAIL_THREAD
= "GET_DETAIL_THREAD";


export const getThreads = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_THREADS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    const db = getFirestore(app);

    try {
      const threadsCollection = collection(db, "threads");
      const threadsSnapshot = await getDocs(threadsCollection);
      const threadsData = threadsSnapshot.docs.map((doc) => doc.data());

      dispatch({
        type: GET_THREADS,
        payload: {
          loading: false,
          data: threadsData,
          errorMessage: false,
        },
      });
    } catch (err) {
      dispatch({
        type: GET_THREADS,
        payload: {
          loading: false,
          data: false,
          errorMessage: err.message,
        },
      });
    }
  };
};

export const getThread = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_THREAD,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    const db = getFirestore(app);
    const auth = getAuth(app);

    try {
      onAuthStateChanged(auth, async (user) => {
        console.log(user);
        if (!user) {
          throw new Error("No logged-in user");
        }

        const q = query(
          collection(db, "threads"),
          where("author.uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const threads = [];
        querySnapshot.forEach((doc) => {
          threads.push({ id: doc.id, ...doc.data() });
        });
        dispatch({
          type: GET_THREAD,
          payload: {
            loading: false,
            data: threads,
            errorMessage: false,
          },
        });
      });

    } catch (err) {
      dispatch({
        type: GET_THREAD,
        payload: {
          loading: false,
          data: false,
          errorMessage: err.message,
        },
      });
    }
  };
};


export const getDetailThread = (uid) => {
  return async (dispatch) => {
    dispatch({
      type: GET_DETAIL_THREAD,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    const db = getFirestore(app);
    const auth = getAuth(app);

    try {
      onAuthStateChanged(auth, async (user) => {
       
        if (!user) {
          throw new Error("No logged-in user");
        }

        const q = query(
          collection(db, "threads"),
          where("uid", "==", uid)
        );
        const querySnapshot = await getDocs(q);
        const threads = [];
        querySnapshot.forEach((doc) => {
          threads.push({ id: doc.id, ...doc.data() });
        });
        dispatch({
          type: GET_DETAIL_THREAD,
          payload: {
            loading: false,
            data: threads,
            errorMessage: false,
          },
        });
      });

    } catch (err) {
      dispatch({
        type: GET_DETAIL_THREAD,
        payload: {
          loading: false,
          data: false,
          errorMessage: err.message,
        },
      });
    }
  };
};