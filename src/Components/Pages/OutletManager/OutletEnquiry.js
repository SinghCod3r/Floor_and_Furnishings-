import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import OutletManagerHeader from "./OutletManagerHeader";
import OutletManagerSidebar from "./OutletManagerSidebar";

function OutletEnquiry() {
  const navigate = useNavigate();
  const [AllOutletEnquiry, setAllOutletEnquiry] = useState([]);
  useEffect(() => {
    GetDataWithToken(`outlet/get-enquiries/${Cookies.get("userID")}`).then(
      (response) => {
        if (response.status === true) {
          setAllOutletEnquiry(response.data);
        }
      }
    );
  }, []);
  return (
    <>
      <div
        data-typography="poppins"
        data-theme-version="light"
        data-layout="horizontal"
        data-nav-headerbg="color_1"
        data-headerbg="color_1"
        data-sidebar-style="full"
        data-sibebarbg="color_1"
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-container="wide"
        direction="ltr"
        data-primary="color_1"
        className="outlet_style"
      >
        <OutletManagerHeader />
        <OutletManagerSidebar />
        <div className="content-body">
          {/* row */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">All Enquiries</h4>
                  </div>
                  <div className="card-body">
                    <div className="table card-table display mb-4 shadow-hover table-responsive-lg">
                      <table
                        id="example4"
                        className="table card-table display mb-4 shadow-hover table-responsive-lg"
                        style={{ minWidth: "845px" }}
                      >
                        <thead>
                          <tr>
                            <th>Enquiry number</th>
                            <th>Customer Name</th>
                            <th>Mobile No.</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {console.log("length", AllOutletEnquiry)} */}

                          {AllOutletEnquiry && AllOutletEnquiry.length < 0 ? (
                            <p>No Enquiry Found</p>
                          ) : (
                            AllOutletEnquiry.map((data, index) => (
                              <tr>
                                <>
                                  <td>{data.id}</td>
                                  <td>{data?.contactPerson}</td>
                                  <td>{data?.contactNumber}</td>
                                  <td>
                                    <span
                                      className={
                                        data?.status === "inprogess"
                                          ? "badge  badge-primary"
                                          : "badge badge-dark"
                                      }
                                    >
                                      {data?.status}
                                    </span>
                                  </td>
                                  <td>
                                    {moment(data?.createdAt).format("ll")}
                                  </td>
                                  <td>
                                    <button
                                      onClick={() => {
                                        navigate(`/OutletEnquiryDetials/${data?.id}`, {
                                          state: { data: data.id },
                                        });
                                      }}
                                      className="btn btn-primary btn-sm"
                                    >
                                      View More
                                    </button>
                                  </td>
                                </>
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

export default OutletEnquiry;
