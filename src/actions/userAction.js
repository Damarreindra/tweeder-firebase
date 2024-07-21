import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged, 
  updateProfile
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import app from "../firebase";

// Define action types
export const GET_LIST_USER = "GET_LIST_USER";
export const ADD_USER = "ADD_USER";
export const ADD_POST = "ADD_POST";
export const ADD_POST_PROFILE = "ADD_POST_PROFILE";
export const LOGOUT = "LOGOUT";
export const UPDATE_PUBLISH = "UPDATE_PUBLISH";
export const UNPUBLISH = "UNPUBLISH";
export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_PROFILE_PICT = "ADD_PROFILE_PICT";
export const EDIT_PROFILE_PICT = "EDIT_PROFILE_PICT";
export const LOGIN = "LOGIN";
export const CHANGE_LOADING = "CHANGE_LOADING";
export const CHANGE_TOKEN = "CHANGE_TOKEN";
export const ERR_MESSAGE = "ERR_MESSAGE";
export const STORE_USER_DATA = "STORE_USER_DATA";

// Authentication Actions


export const logout = () => async (dispatch) => {
  const auth = getAuth(app);

  try {
    await signOut(auth);
    dispatch({ type: LOGOUT });
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export const getListUser = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_LIST_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    const db = getFirestore(app);

    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc) => doc.data());

      dispatch({
        type: GET_LIST_USER,
        payload: {
          loading: false,
          data: usersData,
          errorMessage: false,
        },
      });
    } catch (err) {
      dispatch({
        type: GET_LIST_USER,
        payload: {
          loading: false,
          data: false,
          errorMessage: err.message,
        },
      });
    }
  };
};

export const addUser = (data) => async (dispatch) => {
  dispatch({
    type: ADD_USER,
    payload: { loading: true, data: false, errorMessage: false },
  });

  const auth = getAuth(app);
  const db = getFirestore(app)
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user

    await updateProfile(user,{
      displayName:data.username
    })

    await setDoc(doc(db, "users", user.uid), {
    name: data.name,
    header: "https://github.com/user-attachments/assets/bb0a7e02-17b8-4ed2-96f2-dd69622a63b6",
    });

    dispatch({
      type: ADD_USER,
      payload: {
        loading: false,
        data: userCredential.user,
        errorMessage: false,
      },
    });
    return true;
  } catch (error) {
    dispatch({
      type: ADD_USER,
      payload: { loading: false, data: false, errorMessage: error.message },
    });
    return false;
  }
};

export const addPost = (data) => async (dispatch) => {
  dispatch({
    type: ADD_POST,
    payload: { loading: true, data: false, errorMessage: false },
  });
  const db = getFirestore(app)
  const auth = getAuth(app);

  try {
    await new Promise((resolve, reject) => {
      
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          return reject(new Error("No logged-in user"));
        }
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
       
      
        const newThreadRef = doc(collection(db, "threads")); // Create a new document reference
        const postDataWithAuthorAndUid = {
          ...data,
          uid: newThreadRef.id, 
          likes:0,
          likedBy:[],
          comments:[],
          author: {
            displayName: user.displayName,
            photoUrl: user.photoURL,
            uid: user.uid,
            name: userDoc.data().name
          },
        };

        try {
          await setDoc(newThreadRef, postDataWithAuthorAndUid); // Use setDoc to set the document with the generated ID
          resolve();
        } catch (error) {
          console.error("Error adding document:", error); // Logging for debugging
          reject(error);
        }
      });
    });

    dispatch({
      type: ADD_POST,
      payload: { loading: false, data: true, errorMessage: false },
    });
    return true;
  } catch (error) {
    dispatch({
      type: ADD_POST,
      payload: { loading: false, data: false, errorMessage: error.message },
    });
    return false;
  }
};

export const addPostProfile = (data) => async (dispatch) => {
  const id = localStorage.getItem("id");
  dispatch({
    type: ADD_POST_PROFILE,
    payload: { loading: true, data: false, errorMessage: false },
  });
  const db = getFirestore(app);

  try {
    await addDoc(collection(db, `users/${id}/threads`), data);
    dispatch({
      type: ADD_POST_PROFILE,
      payload: { loading: false, data: true, errorMessage: false },
    });
    return true;
  } catch (error) {
    dispatch({
      type: ADD_POST_PROFILE,
      payload: { loading: false, data: false, errorMessage: error.message },
    });
    return false;
  }
};



export const addComment = ({comment, uid, createdAt, user}) => async (dispatch) => {
  
  dispatch({
    type: ADD_COMMENT,
    payload: { loading: true, data: false, errorMessage: false },
  });
  const db = getFirestore(app);
  try {
    const newThreadRef = doc(db, "threads", uid);
    console.log(newThreadRef);
    const commentWithTimestamp = {
      comment,
      createdAt: createdAt,
      author:{
        displayName:user.displayName,
        photoURL: user.photoURL,
      }
      
    };
    await updateDoc(newThreadRef,{
      comments: arrayUnion(commentWithTimestamp)
    });
    dispatch({
      type: ADD_COMMENT,
      payload: { loading: false, data: true, errorMessage: false },
    });
  } catch (error) {
    console.error(error)
    dispatch({
      type: ADD_COMMENT,
      payload: { loading: false, data: false, errorMessage: error.message },
    });
  }
};





export const addProfileImg = (data) => {
  return async (dispatch) => {
    const id = localStorage.getItem("id");
    dispatch({
      type: ADD_PROFILE_PICT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    const db = getFirestore(app);

    try {
      const userDocRef = doc(db, "users", id);
      await setDoc(userDocRef, data);

      dispatch({
        type: ADD_PROFILE_PICT,
        payload: {
          loading: false,
          data: data,
          errorMessage: false,
        },
      });

      window.location = "/login";
    } catch (err) {
      dispatch({
        type: ADD_PROFILE_PICT,
        payload: {
          loading: false,
          data: false,
          errorMessage: err.message,
        },
      });
    }
  };
};

export const editProfileImg = (data) => {
  return async (dispatch) => {
    const id = localStorage.getItem("id");
    dispatch({
      type: EDIT_PROFILE_PICT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    const db = getFirestore(app);

    try {
      const userDocRef = doc(db, "users", id);
      await updateDoc(userDocRef, data);

      dispatch({
        type: EDIT_PROFILE_PICT,
        payload: {
          loading: false,
          data: data,
          errorMessage: false,
        },
      });

      localStorage.setItem("img", data.profile_img);
      window.location = `/profile/${id}`;
    } catch (err) {
      dispatch({
        type: EDIT_PROFILE_PICT,
        payload: {
          loading: false,
          data: false,
          errorMessage: err.message,
        },
      });
    }
  };
};


