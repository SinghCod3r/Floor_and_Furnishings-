import React from "react";
import { Link } from "react-router-dom";
import DispatchTeamHeader from "./DispatchTeamHeader";
import DispatchTeamSidebar from "./DispatchTeamSidebar";

function DispatchTeamDashboard() {
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
        <DispatchTeamHeader />
        <DispatchTeamSidebar />

        <div className="content-body">
          {/*--- row ---*/}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="alert bg-secondary mb-5">
                  <h3 className="text-white ">Dispatch Team Dashboard</h3>
                </div>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="row">
                      <div className="col-xl-3 col-sm-6">
                        <div className="card booking">
                          <div className="card-body">
                            <div className="booking-status d-flex align-items-center">
                              <span>
                                <img src="./images/🦆 icon _measure meter_30px.svg" />
                              </span>
                              <div className="ms-4">
                                <h2 className="mb-0 font-w600">8,461</h2>
                                <p className="mb-0 text-nowrap">Total Orders</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6">
                        <div className="card booking">
                          <div className="card-body">
                            <div className="booking-status d-flex align-items-center">
                              <span>
                                <img src="./images/Group 81.svg" />
                              </span>
                              <div className="ms-4">
                                <h2 className="mb-0 font-w600">234m</h2>
                                <p className="mb-0 text-nowrap">
                                  Pending Orders
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6">
                        <div className="card booking">
                          <div className="card-body">
                            <div className="booking-status d-flex align-items-center">
                              <span>
                                <img src="./images/Group 81.svg" />
                              </span>
                              <div className="ms-4">
                                <h2 className="mb-0 font-w600">753</h2>
                                <p className="mb-0">Commpleted Orders</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  data table */}
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table
                            id="example4"
                            className="table card-table display mb-4 shadow-hover table-responsive-lg"
                            style={{ minWidth: "845px" }}
                          >
                            <thead>
                              <tr>
                                <th>Outlet Name</th>
                                <th>Outlet Address</th>
                                <th>Outlet Mobile No.</th>
                                <th>Email</th>
                                <th>Outlet id</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Outlet 1</td>
                                <td>Outlet Address 1</td>
                                <td>9087654321</td>
                                <td>outlet@gmail.com</td>
                                <td>#54605</td>
                                <td>
                                  <Link
                                    to={"/DispatchTeamProductDescription"}
                                    className="btn btn-primary"
                                  >
                                    View order
                                  </Link>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="text-center">
                        <Link
                          to={"/dispatch-team-all-order"}
                          className="btn btn-primary rounded-pill px-5 mb-3"
                        >
                          View all orders
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* data table close */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*----- Content body end -----*/}
      </div>
    </>
  );
}

export default DispatchTeamDashboard;
