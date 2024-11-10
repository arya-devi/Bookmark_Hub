import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, loginUser } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const message = useSelector((state) => state.auth.message);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userCredentials = { email, password };
    dispatch(loginUser(userCredentials));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  }, [message, dispatch]);

  return (
    <div className="container mt-5" style={{ backgroundColor: "#E9EFEC" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card" style={{ backgroundColor: "#C4DAD2", borderColor: "#6A9C89" }}>
            <div className="card-body">
              <h2 className="text-center mb-4" style={{ color: "#16423C" }}>Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#16423C" }}>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ borderColor: "#6A9C89" }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#16423C" }}>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ borderColor: "#6A9C89" }}
                  />
                </div>
                <button type="submit" className="btn w-100" style={{ backgroundColor: "#6A9C89", color: "#FFFFFF" }}>
                  Login
                </button>
                {message && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {message}
                  </div>
                )}
                <p className="text-center" style={{ color: "#16423C" }}>
                  Don't have an account? <Link to="/" style={{ color: "#6A9C89" }}>SignUp</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
