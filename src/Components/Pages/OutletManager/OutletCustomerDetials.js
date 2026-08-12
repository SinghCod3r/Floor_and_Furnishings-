import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import OutletManagerHeader from "./OutletManagerHeader";
import OutletManagerSidebar from "./OutletManagerSidebar";

function OutletCustomerDetials() {
  const location = useLocation();
  const navigate = useNavigate();
  const [CustomerDetials, setCustomerDetials] = useState({});

  useEffect(() => {
    console.log("location", location.state.data);
    GetDataWithToken(`superadmin/get-customer/${location.state.data}`).then(
      (response) => {
        if (response.status === true) {
          setCustomerDetials(response.data);
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
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card overflow-hidden">
                  <div className="row m-0">
                    <div className="col-xl-12 p-0">
                      <div className="card-body">
                        <div className="guest-profile">
                          <div className="d-flex">
                            <img src="./images/user.png" alt="" />
                            <div>
                              <h2 className="font-w600 ">
                                {CustomerDetials?.firstName}{" "}
                                {CustomerDetials?.lastName}
                              </h2>
                              <span className="text-secondary">
                                ID #{CustomerDetials?.id}
                              </span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-3">
                              <div className="mt-4 check-status">
                                <span className="d-block mb-2">
                                  Primary Email
                                </span>
                                <span className="font-w500 fs-16">
                                  {CustomerDetials?.primary_email}
                                </span>
                              </div>
                              <div className="mt-4 check-status">
                                <span className="d-block mb-2">
                                  Secondary Email
                                </span>
                                <span className="font-w500 fs-16">
                                  {CustomerDetials?.secondary_email}
                                </span>
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div className="mt-4">
                                <span className="d-block mb-2">
                                  Phone Number
                                </span>
                                <span className="font-w500 fs-16">
                                  {CustomerDetials?.primary_phone}
                                </span>
                              </div>
                              <div className="mt-4">
                                <span className="d-block mb-2">
                                  Secondary Phone Number
                                </span>
                                <span className="font-w500 fs-16">
                                  {CustomerDetials?.secondary_phone}
                                </span>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="mt-4">
                                <span className="d-block mb-2">Address</span>
                                <span className="font-w500 fs-16">
                                  B-48 Hariyana bhawan road in front of malaviya
                                  public school patel nagar bikaner
                                </span>
                              </div>
                              <div className="mt-4">
                                <span className="d-block mb-2">
                                  Company name and GST
                                </span>
                                <span className="font-w500 fs-16">
                                  {CustomerDetials?.companyName} :{" "}
                                  {CustomerDetials?.GST}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header border-0">
                    <h4 className="fs-20">Purchase History</h4>
                    <div className="newest ms-3">
                      <select className="default-select">
                        <option>Newest</option>
                        <option>Oldest</option>
                      </select>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table
                      className="table card-table display mb-4 shadow-hover table-responsive-lg"
                      id="guestTable-all"
                    >
                      <thead>
                        <tr>
                          <th>Enquiry no.</th>
                          <th>Date of Enquiry</th>
                          <th>Category's</th>
                          <th>Status</th>
                          <th>Action</th>
                          <th>Add Complaint</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CustomerDetials?.enquiries &&
                          CustomerDetials?.enquiries.map((item, index) => (
                            <tr key={index}>
                              <td>{item.id}</td>
                              <td>{item.createdAt}</td>
                              <td>N/A</td>

                              <td>
                                <span className="badge badge-warning">
                                  {item.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  onClick={() => {
                                    navigate(`/OutletEnquiryDetials/${item?.id}`, {
                                      state: { data: item.id },
                                    });
                                  }}
                                  className="btn btn-primary btn-sm"
                                >
                                  View
                                </button>
                                {/* <a
                                    href="Schedule.html"
                                    className="btn btn-primary btn-sm"
                                  >
                                    Enquiry Assignment
                                  </a> */}
                              </td>
                              <td> <Link
                                className="btn btn-primary btn-sm"
                                to="/outlet-customer-complaint-category"
                                state={{ data: { id: item.id } }}
                              >Add</Link></td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
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

export default OutletCustomerDetials;
