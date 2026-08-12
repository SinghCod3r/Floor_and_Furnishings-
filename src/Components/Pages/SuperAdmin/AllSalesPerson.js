import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Common/Loader";
import { SalesPerson } from "../../Common/RoleType";
import useFetch from "../../Hooks/CallBack";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import moment from "moment";
import { GetDataWithToken, PutDataWithToken } from "../../ApiHelper/ApiHelper";
import { toast } from "material-react-toastify";

function AllSalesPerson() {
  const navigate = useNavigate();
  const [userData, SetUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSalesPerson();
  }, [])

  function getSalesPerson(status) {
    setIsLoading(true);
    let statusValue = status ? `&status=${status}` : "";
    GetDataWithToken(`superadmin/get-users?type=${SalesPerson}` + statusValue).then((response) => {
      setIsLoading(false);
      if (response.status == true) {
        SetUserData(response.data);
      }
    })
  }

  const statusChangeHandler = (event) => {
    let status;
    if (event?.target?.value == "block") {
      status = 1;
    } else if (event?.target?.value == "unblock") {
      status = 0;
    } else {
      status = null;
    }
    SetUserData([]);
    getSalesPerson(status);

  }

  const UserBlockHandler = (data, status) => {
    PutDataWithToken("auth/block-user", {
      id: data?.id,
      is_block: status,
    }).then((response) => {
      if (response.status === true) {
        const updatedUserData = userData.map((userObj) => {
          if (userObj.id === data.id) {
            return { ...userObj, isblocked: status };
          }
          return userObj;
        });
        SetUserData(updatedUserData)
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(response.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    })
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
                    <h4 className="card-title">All Sales Person</h4>
                    <div className="d-flex align-items-center gap-2">
                      <label>Status:</label>
                      <select
                        onChange={statusChangeHandler}
                        className="form-control"
                      >
                        <option value="">All</option>
                        <option value="block">Block</option>
                        <option value="unblock">Unblock</option>
                      </select>
                      <Link to={"/Add-new-user"} className="btn btn-primary py-2 text-nowrap">
                        Add New
                      </Link>
                    </div>

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
                            <th>Phone Number</th>
                            <th>Email</th>
                            {/* <th>Login Time</th> */}
                            {/* <th>Logout Time</th> */}
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>

                          {/* {Error && <div>Error</div>} */}
                          {isLoading && <Loader />}
                          {userData && userData.length === 0 && !isLoading ? (
                            <div>
                              <h4 className="text-center d-block w-100 position-absolute">
                                No Data Found
                              </h4>
                            </div>
                          ) : (
                            userData.map((outletManager, index) => (
                              <tr key={index}>
                                <td>
                                  {outletManager.firstName}{" "}
                                  {outletManager.lastName}
                                </td>
                                <td>{outletManager.userId}</td>
                                <td>{outletManager.phone}</td>
                                <td>{outletManager.email}</td>
                                {/* <td>{outletManager?.login_time && moment(outletManager?.login_time).format("DD/MM/YYYY")}</td> */}
                                {/* <td>{outletManager?.logout_time && moment(outletManager?.logout_time).format("DD/MM/YYYY")}</td> */}

                                <td>
                                  <div className="d-flex gap-1">
                                    <button
                                      onClick={() => {
                                        navigate("/staff-detials", {
                                          state: { data: outletManager },
                                        });
                                      }}
                                      className="btn btn-primary"
                                    >
                                      View
                                    </button>
                                    {outletManager?.isblocked ? <button
                                      onClick={() => UserBlockHandler(outletManager, false)}
                                      className="btn btn-secondary ms-1">Unblock</button>
                                      : <button
                                        onClick={() => UserBlockHandler(outletManager, true)}
                                        className="btn btn-secondary ms-1">Block</button>
                                    }
                                  </div>
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

export default AllSalesPerson;
