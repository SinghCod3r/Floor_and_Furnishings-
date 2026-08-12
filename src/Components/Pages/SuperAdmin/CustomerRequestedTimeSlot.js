import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function CustomerRequestedTimeSlot() {
  const [CustomerRequestedTimeSlot, setCustomerRequestedTimeSlot] = useState(
    []
  );
  useEffect(() => {
    GetDataWithToken("superadmin/get-enquiry-schedule").then((response) => {
      if (response.status === true) {
        console.log("response", response.data);
        setCustomerRequestedTimeSlot(response.data);
      }
    });
  }, [""]);
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
                    <h4 className="card-title">All Requested Time Slot</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        id="example2"
                        className="table card-table display mb-4 shadow-hover table-responsive-lg"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>Name</th>

                            <th>Customer name</th>
                            <th>Schedules</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {CustomerRequestedTimeSlot &&
                          CustomerRequestedTimeSlot.length === 0 ? (
                            <p>No Data Found</p>
                          ) : (
                            CustomerRequestedTimeSlot.map((item, index) => {
                              return (
                                <tr>
                                  <td>
                                    {item?.user?.firstName}{" "}
                                    {item?.user?.lastName}
                                  </td>

                                  <td>
                                    <a href>
                                      {" "}
                                      {item?.enquiry?.user?.firstName}{" "}
                                      {item?.enquiry?.user?.lastName}
                                    </a>{" "}
                                  </td>
                                  <td>
                                    {moment(item.date).format("lll")} (
                                    {item?.schedule?.start_time} -{" "}
                                    {item?.schedule?.end_time})
                                  </td>
                                  <td>
                                    <span className="badge light badge-success">
                                      Pending
                                    </span>
                                  </td>
                                  <td>
                                    <button className="btn btn-primary">
                                      view more
                                    </button>
                                  </td>
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
    </>
  );
}

export default CustomerRequestedTimeSlot;
