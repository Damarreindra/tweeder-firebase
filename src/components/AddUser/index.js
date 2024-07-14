import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../actions/userAction";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function AddUser() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("user");
  const [error, setError] = useState("");
  const { addUserResult, addUserError } = useSelector(
    (state) => state.UserReducer
  );

  const createdAt = Date.now();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addUser({
        email: email,
        username: username,
        password: password,
        createdAt: createdAt,
        role: "user",
      })
    );
  };

  useEffect(() => {
    if (addUserResult) {
      alert("Account Successfully Created");
      window.location = "/login";
      setPassword("");
      setUsername("");
      setEmail("");
    } else if (addUserError) {
      setError(addUserError);
   
      setEmail("");
    }
  }, [addUserResult, addUserError]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mt-5 col-md-7">
        <div className="card mb-4">
          <div className="row g-0">
            <div className="col-md-6 d-none d-md-block">
              <img
                src="images/tangga.jpg"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-6 mx-auto">
              <div className="card-body text-center">
                <h2 className="card-title border-bottom mb-4 text-success">
                  Tweeder
                </h2>
                <h5 className="card-title mb-3">Registration</h5>
                <form action="" onSubmit={(e) => handleSubmit(e)} id="form">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      id="email"
                      placeholder="name@example.com"
                      required
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      name="username"
                      id="uname"
                      minLength={8}
                      maxLength={8}
                      placeholder="Username"
                      required
                    />
                    <label htmlFor="floatingUname">Username</label>
                  </div>
                  <input type="hidden" id="role" name="role" value={role} />
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      id="pword"
                      placeholder="Password"
                      required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <button type="submit" className="btn btn-success">
                    Register
                  </button>
                  <div className="container mt-3">
                    <h7>
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        style={{ color: "green", textDecoration: "none" }}
                      >
                        Login
                      </Link>
                    </h7>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AddUser;
