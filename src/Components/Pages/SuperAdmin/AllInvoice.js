import React from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function AllInvoice() {
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
                    <h4 className="card-title">All Users</h4>
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
                            <th>Invoice No.</th>
                            <th>Customer Name</th>
                            <th>Category Type</th>
                            <th>Payment Method</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>#TYT453</td>
                            <td>Mr Gupta</td>
                            <td>Curtain,wallpapers</td>
                            <td>Cash</td>
                            <td>
                              <span className="badge light badge-success">
                                Paid
                              </span>
                            </td>
                            <td>
                              <a href="" className="btn btn-primary">
                                View More
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>#TYT453</td>
                            <td>Mr Gupta</td>
                            <td>Curtain,wallpapers</td>
                            <td>Cash</td>
                            <td>
                              <span className="badge light badge-success">
                                Paid
                              </span>
                            </td>
                            <td>
                              <a href="" className="btn btn-primary">
                                View More
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>#TYT453</td>
                            <td>Mr Gupta</td>
                            <td>Curtain,wallpapers</td>
                            <td>Cash</td>
                            <td>
                              <span className="badge light badge-success">
                                Paid
                              </span>
                            </td>
                            <td>
                              <a href="" className="btn btn-primary">
                                View More
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>#TYT453</td>
                            <td>Mr Gupta</td>
                            <td>Curtain,wallpapers</td>
                            <td>Cash</td>
                            <td>
                              <span className="badge light badge-success">
                                Paid
                              </span>
                            </td>
                            <td>
                              <a href="" className="btn btn-primary">
                                View More
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>#TYT453</td>
                            <td>Mr Gupta</td>
                            <td>Curtain,wallpapers</td>
                            <td>Cash</td>
                            <td>
                              <span className="badge light badge-success">
                                Paid
                              </span>
                            </td>
                            <td>
                              <a href="" className="btn btn-primary">
                                View More
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>#TYT453</td>
                            <td>Mr Gupta</td>
                            <td>Curtain,wallpapers</td>
                            <td>Cash</td>
                            <td>
                              <span className="badge light badge-success">
                                Paid
                              </span>
                            </td>
                            <td>
                              <a href="" className="btn btn-primary">
                                View More
                              </a>
                            </td>
                          </tr>
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

export default AllInvoice;
