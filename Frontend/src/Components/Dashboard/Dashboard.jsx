import React, { useEffect } from 'react';
import { FaRegIdCard, FaRegEdit } from 'react-icons/fa';
import Memberbox from "./Memerbox";
import { DashboardUser } from '../../Redux/Reducer/DashboardReducer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../ApiCheck/Loader';

const Dashboard = () => {
const { user, loading } = useSelector((state) => state.Dashboard);
console.log("user", user)
  const dispatch = useDispatch();
  useEffect(() => {
        dispatch(DashboardUser());
  }, []);
  if(loading) return <Loader/>
  return (
    <div className="dashboard">
    <div className="container">
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div style={{ border: '2px solid #e0e0e0', borderRadius: '15px' }}>
          <h2 className="text-center mb-4">
            Association <span className="text-primary">Membership Form</span>
          </h2>

          <div className="p-4">
            <div className="row justify-content-center">
              {user && user.isMember ? (
                <>
                  <Memberbox
                    icon={<FaRegIdCard size={40} className="mb-2" />}
                    text="View your Membership Detail"
                    isPrimary
                    path="view"
                  />
                  <Memberbox
                    icon={<FaRegEdit size={40} className="text-primary mb-2" />}
                    text="Edit Association Membership Form"
                      path="edit"
                  />
                </>
              ) : (
                <Memberbox
                  icon={<FaRegIdCard size={40} className="mb-2" />}
                  text="Create your Membership Detail"
                  isPrimary
                  path="create"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Dashboard;