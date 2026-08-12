import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../../Common/Loader";
import { Measurer } from "../../Common/RoleType";
import useFetch from "../../Hooks/CallBack";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { GetDataWithToken, PostDataWithToken, PutDataWithToken } from "../../ApiHelper/ApiHelper";

function AllMeasurer() {
  const navigate = useNavigate();
  const [refetch, setRefetch] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GetMeasurerList();
  }, [])

  const GetMeasurerList = () => {
    setIsLoading(true);
    GetDataWithToken(`superadmin/get-users?type=${Measurer}`).then((res) => {
      setIsLoading(false);
      if (res.status === true) {
        setData(res.data);
      }
    })
  }

  const UserToggleBlockHandler = (id, isBlocked) => {
    const Data = {
      id: id, is_block: isBlocked
    }
    PutDataWithToken("auth/block-user", Data).then((response) => {
      if (response.status == true) {
        GetMeasurerList();
      } else {

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
                    <h4 className="card-title">All Measurer</h4>
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
                            <th>Name</th>
                            <th>User ID</th>
                            <th>Mobile Number</th>
                            <th>Email</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {Error && <div>Error</div>} */}
                          {isLoading && <Loader />}
                          {data && data.length === 0 ? (
                            <div>
                              <h4 className="text-center d-block w-100 position-absolute">
                                No Data Found
                              </h4>
                            </div>
                          ) : (
                            data.map((Measurer, index) => (
                              <tr key={index}>
                                <td>
                                  {Measurer.firstName} {Measurer.lastName}
                                </td>
                                <td>{Measurer.userId}</td>
                                <td>{Measurer.phone}</td>
                                <td>{Measurer.email}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      navigate("/Measurer-detials", {
                                        state: { data: Measurer.id },
                                      });
                                    }}
                                    className="btn btn-primary"
                                  >
                                    View
                                  </button>

                                  {Measurer?.isblocked ?
                                    <button
                                      onClick={() => UserToggleBlockHandler(
                                        Measurer.id,
                                        false
                                      )
                                      }
                                      className="btn btn-primary mx-1"
                                    >
                                      <i class="fa fa-solid fa-lock-open"></i>
                                    </button>
                                    : <button
                                      onClick={() => UserToggleBlockHandler(
                                        Measurer.id,
                                        true
                                      )
                                      }
                                      className="btn btn-primary mx-1"
                                    >

                                      <i class="fa fa-solid fa-lock"></i>
                                    </button>
                                  }
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

export default AllMeasurer;
