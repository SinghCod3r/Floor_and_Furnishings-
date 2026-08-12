import React from "react";
import DispatchTeamHeader from "./DispatchTeamHeader";
import DispatchTeamSidebar from "./DispatchTeamSidebar";

function DispatchTeamAllOrders() {
  return (
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
              <div className="row">
                <div>
                  <ul className="d-flex mb-5">
                    <li className="col-4 col-md-3">
                      <a href="#" className="anchor-btn active">
                        All orders
                      </a>
                    </li>
                    <li className="col-4 col-md-3">
                      <a href="#" className="anchor-btn">
                        Pending
                      </a>
                    </li>
                    <li className="col-4 col-md-3">
                      <a href="#" className="anchor-btn">
                        Completed
                      </a>
                    </li>
                  </ul>
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
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Outlet 1</td>
                              <td>Outlet Address 1</td>
                              <td>9087654321</td>
                              <td>outlet@gmail.com</td>
                              <td>
                                <a
                                  href="order-description.html"
                                  className="btn btn-primary"
                                >
                                  View Details
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>Outlet 2</td>
                              <td>Outlet Address 2</td>
                              <td>897654321</td>
                              <td>outlet@gmail.com</td>
                              <td>
                                <a
                                  href="order-description.html"
                                  className="btn btn-primary"
                                >
                                  View Details
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>Outlet 3</td>
                              <td>Outlet Address 3</td>
                              <td>9873434210</td>
                              <td>outlet@gmail.com</td>
                              <td>
                                <a
                                  href="order-description.html"
                                  className="btn btn-primary"
                                >
                                  View Details
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* data table close */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DispatchTeamAllOrders;
