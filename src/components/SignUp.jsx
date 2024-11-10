import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearMessage } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

const SignupComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const message = useSelector((state) => state.auth.signUpMessage);
  const user = useSelector((state) => state.auth.users);
  const [signupAttempted, setSignupAttempted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUser(formData));
    setSignupAttempted(true);
  };

  useEffect(() => {
    if (user && signupAttempted && !message) {
      navigate("/login");
    }
  }, [user, navigate, signupAttempted, message]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  }, [message, dispatch]);
  
  useEffect(() => {
    navigate('/')
  }, [message,navigate]);


  return (
    <div className="container mt-5" style={{ backgroundColor: "#E9EFEC" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card" style={{ backgroundColor: "#C4DAD2", borderColor: "#6A9C89" }}>
            <div className="card-body">
              <h2 className="card-title text-center" style={{ color: "#16423C" }}>Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#16423C" }}>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ borderColor: "#6A9C89" }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#16423C" }}>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ borderColor: "#6A9C89" }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#16423C" }}>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ borderColor: "#6A9C89" }}
                  />
                </div>
                <button type="submit" className="btn w-100" style={{ backgroundColor: "#6A9C89", color: "#FFFFFF" }}>
                  Sign Up
                </button>
              </form>
              {message && (
                <div className="alert alert-danger mt-3" role="alert">
                  {message}
                </div>
              )}
              <p className="text-center" style={{ color: "#16423C" }}>
                Already have an account? <Link to="/login" style={{ color: "#6A9C89" }}>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
