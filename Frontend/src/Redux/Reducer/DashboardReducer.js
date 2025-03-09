import { createSlice } from "@reduxjs/toolkit";
import { Endpoint } from "../../ApiCheck/Endpoint";
import axios from "axios"
import { toast } from "react-toastify";
const DashboardReducer = createSlice({
  name: "Dashboard",
  initialState: {
    user: null,
    loading: false,
    member: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMember: (state, action) => {
      state.member = action.payload;
    },
  },
});

export const DashboardUser = () => async (dispatch) => {
    dispatch(setLoading(true));
    console.log("Endpoint", Endpoint)
    try {
        const response = await axios.get(Endpoint.Dashboard.url);
        dispatch(setUser(response?.data?.data));
    } catch (error) {
        console.error("dahboard details failed", error);
        toast.error(error?.response?.data?.message ||'dahboard details failed', { position: 'top-center', autoClose: 3000 });
    } finally {
        dispatch(setLoading(false));
    }
};

export const MemberUser = (userData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  console.log("Endpoint", Endpoint)
  try {
      const response = await axios.post(Endpoint.create.url, userData);
      dispatch(setMember(response.data.data));
      dispatch(setUser(response.data.user));
      toast.success(response?.data?.message ||'Member created Successful', { position: 'top-center', autoClose: 3000 });
      navigate("/dashboard")
  } catch (error) {
    toast.error(error?.response?.data?.message ||'Member created failed', { position: 'top-center', autoClose: 3000 });
  } finally {
      dispatch(setLoading(false));
  }
};
export const Member = () => async (dispatch) => {
  dispatch(setLoading(true));
  console.log("Endpoint", Endpoint)
  try {
      const response = await axios.get(Endpoint.get.url);
      console.log("res", response)
      dispatch(setMember(response?.data?.data));
  } catch (error) {
      console.error("member details failed", error);
      toast.error(error?.response?.data?.message ||'member details failed', { position: 'top-center', autoClose: 3000 });
  } finally {
      dispatch(setLoading(false));
  }
};



export const { setUser, setLoading, setMember } = DashboardReducer.actions;
export default DashboardReducer.reducer;