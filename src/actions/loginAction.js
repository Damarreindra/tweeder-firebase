import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase";

export const login = (email, password) => (dispatch) => {
  dispatch({ type: "CHANGE_LOADING", value: true });
  const auth = getAuth(app);

  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", value: true });
        dispatch({ type: "CHANGE_LOADING", value: true });
        localStorage.setItem('uid', res.user.uid)
        resolve(true);
      })
      .catch(() => {
        dispatch({ type: "LOGIN", value: false });
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "ERR_MESSAGE", value:"Email / Password Salah"})
        reject(false);
      });
  });
};