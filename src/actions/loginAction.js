import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase";

export const login = (email, password) => (dispatch) => {
  dispatch({ type: "CHANGE_LOADING", value: true });
  const auth = getAuth(app);
  // let tokenArray = JSON.parse(localStorage.getItem("tokenArray")) || [];
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user.email);
        dispatch({ type: "LOGIN", value: true });
        dispatch({ type: "CHANGE_TOKEN", value: res._tokenResponse.idToken });
        dispatch({ type: "CHANGE_LOADING", value: true });
     
        localStorage.setItem('USER_ID', res.user.uid);

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