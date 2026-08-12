import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from "../../Common/Loader";
import { StitchingStoreManager } from "../../Common/RoleType";
import useFetch from "../../Hooks/CallBack";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AllStiching() {
  const navigate = useNavigate();
  const { data, Error, isLoading } = useFetch(
    `superadmin/get-users?type=${StitchingStoreManager}`
  );

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
          {/* row */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">All Stitching Managers</h4>
                    <Link to={"/Add-new-user"} className="btn btn-primary">
                      Add New
                    </Link>
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
                            <th>User Id</th>
                            <th>Completed Task</th>
                            <th>Status</th>
                            <th>Action</th>
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
                            data.map((outletManager, index) => (
                              <tr key={index}>
                                <td>
                                  {outletManager.firstName}{" "}
                                  {outletManager.lastName}
                                </td>
                                <td>{outletManager.userId}</td>
                                <td>{outletManager.phone}</td>
                                <td>{outletManager.email}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      navigate("/staff-detials", {
                                        state: { data: outletManager.id },
                                      });
                                    }}
                                    className="btn btn-primary"
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))
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
    </>
  );
}

export default AllStiching;
