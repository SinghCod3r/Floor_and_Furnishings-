import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Common/Loader";
import { SalesPerson } from "../../Common/RoleType";
import useFetch from "../../Hooks/CallBack";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import moment from "moment";
import ActivityLogModal from "../../Common/ActivityLogModal";

function AllUserActivity() {
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState([]);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const activityModalToggle = () => setActivityModalOpen(!activityModalOpen);
  const { data, Error, isLoading } = useFetch(`superadmin/get-users`);

  const ActivityLogModalHandler = (data) => {
    setActivityData(data);
    setActivityModalOpen(!activityModalOpen);
    activityModalToggle();
  }

  return (
    <>
      <div
        data-typography="poppins"
        data-theme-version="light"
        data-layout="vertical"
        data-nav-headerbg="color_1"
        data-headerbg="color_1"
        data-sidebar-style="full"
        data-sibebarbg="color_1"
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-container="wide"
        direction="ltr"
        data-primary="color_1"
        id="main-wrapper"
        className="show"
      >
        <SuperAdminHeader />
        <SuperAdminSidebar />
        <div className="content-body">
          {/*--- row ---*/}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">All User Activity</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        id="example4"
                        className="table card-table display mb-4 shadow-hover table-responsive-lg"
                        style={{ minWidth: "845px" }}
                      >
                        <thead>
                          <tr>
                            <th>User Name</th>
                            <th>User Type</th>
                            <th>User Id</th>
                            <th>Login Date and Time</th>
                            <th>Logout Date and time</th>
                            {/* <th>Login Time</th> */}
                            {/* <th>Logout Time</th> */}
                            {/* <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {Error && <div>Error</div>}
                          {isLoading && <Loader />}
                          {data && data.length === 0 ? (
                            <div>
                              <h4 className="text-center d-block w-100 position-absolute">
                                No Data Found
                              </h4>
                            </div>
                          ) : (
                            data.map((outletManager, index) => {
                              const activity = JSON.parse(
                                outletManager.activity
                              );
                              return (
                                <tr key={index}>
                                  <td>
                                    {outletManager.firstName}{" "}
                                    {outletManager.lastName}
                                  </td>
                                  <td>{outletManager.type}</td>
                                  <td>{outletManager.userId}</td>
                                  <td>
                                    <ul>
                                      {activity &&
                                        activity?.slice(0, 4)?.map((entry, index) => (
                                          <li key={index}>
                                            <strong>Login Time:</strong>{" "}
                                            {moment(entry.login_time).format(
                                              "MMMM Do YYYY HH:mm:ss"
                                            )}
                                          </li>
                                        ))}
                                    </ul>
                                  </td>
                                  <td>
                                    <ul>
                                      {activity &&
                                        activity?.slice(0, 4)?.map((entry, index) => (
                                          <li key={index}>
                                            <strong>Logout Time:</strong>{" "}
                                            {moment(entry.logout_time).format(
                                              "MMMM Do YYYY HH:mm:ss"
                                            )}
                                          </li>
                                        ))}
                                    </ul>
                                    {activity && activity?.length > 3 && <span
                                      onClick={() => ActivityLogModalHandler(activity)}
                                      className="py-3">
                                      Show More...</span>}
                                    {/* {outletManager?.login_time &&
                                      moment(outletManager?.login_time).format(
                                        "DD/MM/YYYY"
                                      )} */}
                                  </td>
                                  {/* <td>
                                  {outletManager?.logout_time &&
                                    moment(outletManager?.logout_time).format(
                                      "DD/MM/YYYY"
                                    )}
                                </td> */}

                                  <td></td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ActivityLogModal
        ActivityOpen={activityModalOpen}
        toggle={activityModalToggle}
        ActivityLog={activityData}
      />
    </>
  );
}

export default AllUserActivity;
