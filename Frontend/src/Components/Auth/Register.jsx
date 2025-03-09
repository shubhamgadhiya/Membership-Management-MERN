import React from 'react';
import Img from "../../assets/img.jpg";
import { MdOutlineMail } from "react-icons/md";
import { ImUnlocked } from "react-icons/im";
import { useDispatch } from "react-redux";
import { registerUser } from '../../Redux/Reducer/AuthReducer';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerValidationSchema } from './Config';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      console.log("Register Form", values);
      dispatch(registerUser(values, navigate));
    },
  });

  return (
    <div className='register'>
      <div className='container'>
        <div className="d-flex justify-content-center w-100 vh-100 align-items-center">
          <div className="d-flex">
            <div className="w-50 p-4">
              <h1 className="mb-4">Registration</h1>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <label className="form-label">Email</label>
                  <div className="position-relative">
                    <div className="icon">
                      <MdOutlineMail />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder='Enter Your Email'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ps-5 register-border ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                      required
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
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
                      className={`form-control ps-5 register-border ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                      required
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-feedback">{formik.errors.password}</div>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <div className="position-relative">
                    <div className="icon">
                      <ImUnlocked />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder='Enter Your Confirm Password'
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ps-5 register-border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                      required
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                      <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                    )}
                  </div>
                </div>
                <button type="submit" className="register-button mt-4 w-100 register-border">
                  Register
                </button>
                <div className='mt-2 text-center'>
                  Already have an account? <Link to="/login" className="text-dark">Log In</Link>
                </div>
              </form>
            </div>
            <div className="w-50">
              <img
                src={Img}
                alt="img"
                className="h-100 w-100 register-border"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
