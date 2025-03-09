import React from 'react';
import { FaUser } from "react-icons/fa";
import { ImUnlocked } from "react-icons/im";
import { useDispatch } from 'react-redux';
import { LoginUser } from '../../Redux/Reducer/AuthReducer';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { LoginvalidationSchema } from './Config';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginvalidationSchema,
    onSubmit: (values) => {
      const payload = { email: values.username, password: values.password };
      dispatch(LoginUser(payload, navigate));
    },
  });

  return (
    <div className='login'>
      <div className='container'>
        <div className="d-flex justify-content-center w-100 vh-100 align-items-center">
          <div className='login-page'>
            <h1 className="mb-4">Log In</h1>

            <form onSubmit={formik.handleSubmit}>
              <div>
                <label className="form-label">Username</label>
                <div className="position-relative">
                  <div className="icon">
                    <FaUser />
                  </div>
                  <input
                    type="email"
                    name="username"
                    placeholder='Enter Your Username'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ps-5 login-border ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                    required
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="invalid-feedback">{formik.errors.username}</div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="position-relative">
                  <div className="icon">
                    <ImUnlocked />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder='Enter Your Password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ps-5 login-border ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    required
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">{formik.errors.password}</div>
                  )}
                </div>
              </div>

              <button type="submit" className="login-button mt-4 w-100 login-border">
                Log In
              </button>
              <div className='mt-2 text-center'>
                Don't have an account? <Link to="/register" className="text-dark">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
