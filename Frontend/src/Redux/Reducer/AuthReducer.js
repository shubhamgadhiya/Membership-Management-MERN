import { createSlice } from "@reduxjs/toolkit";
import { Endpoint } from "../../ApiCheck/Endpoint";
import axios from "axios"
import { toast } from "react-toastify";
import Token from "../../ApiCheck/Token";
const AuthReducer = createSlice({
  name: "Auth",
  initialState: {
    user: null,
    loading: false,
    token: null,
    isAuth: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuth = true
    },
    logOut: (state) => {
      state.user = null;
      state.isAuth = false;
      state.token = null;
      state.error = null
    },
  },
});

export const registerUser = (userData, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    console.log("navigate", navigate)
    try {
        const response = await axios.post(Endpoint.Register.url, userData);
       
        toast.success(response?.data?.message ||'Registration Successful', { position: 'top-center', autoClose: 3000 });
        navigate("/login")
    } catch (error) {
      toast.error(error?.response?.data?.message ||'Registration failed', { position: 'top-center', autoClose: 3000 });
    } finally {
        dispatch(setLoading(false));
    }
};

export const LoginUser = (userData, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    console.log("Endpoint", Endpoint)
    try {
        const response = await axios.post(Endpoint.Login.url, userData);
        localStorage.setItem("usertoken", response?.data?.token);
        dispatch(setUser(response?.data?.data));
        dispatch(setToken(response?.data?.token));
        Token(response?.data?.token)
        toast.success(response?.data?.message ||'Login Successful', { position: 'top-center', autoClose: 3000 });
        setTimeout(() => {
          navigate("/dashboard")
        }, 2000); 
    } catch (error) {
        console.error("Login failed", error);
        toast.error(error?.response?.data?.message ||'Login failed', { position: 'top-center', autoClose: 3000 });
    } finally {
        dispatch(setLoading(false));
    }
};


export const { setUser, setLoading, setToken, logOut } = AuthReducer.actions;
export default AuthReducer.reducer;
