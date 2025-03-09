import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate,Route,BrowserRouter as Router,Routes} from "react-router-dom";
const Dashboard = lazy(() => import("./Components/Dashboard/Dashboard"));
const Login = lazy(() => import("./Components/Auth/Login"));
const Register = lazy(() => import("./Components/Auth/Register"));

import { useDispatch, useSelector } from "react-redux";
import { logOut, setToken, setUser } from "./Redux/Reducer/AuthReducer";
import { jwtDecode } from "jwt-decode";
import Token from "./ApiCheck/Token";
import PrivateRoute from "./ApiCheck/PrivateRoute";
import PublicRoute from "./ApiCheck/PublicRoute";
import Loader from "./ApiCheck/Loader";
import Member from "./Components/Member/Member";
import MemberView from "./Components/Member/MemberView";
import MemberEdit from "./Components/Member/MemberEdit";

const App = () => {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
  const [loading, setLoading] = useState(true); 

  console.log("Auth", Auth);
  const token = localStorage.getItem("usertoken");

  useEffect(() => {
    if (token && !Auth.isAuth) {
      Token(token);
      dispatch(setToken(token));
      const decoded = jwtDecode(token);
      dispatch(setUser(decoded));
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("usertoken");
        dispatch(logOut());
      }
    }
    setLoading(false);
  }, [dispatch, token]);
  if (loading) return <Loader/>;  

  return (
    <>
      <Router>
      
      <Suspense fallback={<Loader />}> 
        <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateRoute />}>
          
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/create" element={<Member />} />
            <Route path="/dashboard/view" element={<MemberView />} />
            <Route path="/dashboard/edit" element={<MemberEdit />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
