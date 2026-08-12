import React from "react";
import { Link } from "react-router-dom";
import DispatchTeamHeader from "./DispatchTeamHeader";
import DispatchTeamSidebar from "./DispatchTeamSidebar";

function DispatchTeamProductDesc() {
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
            <h3>Order Description</h3>
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body d-flex">
                    <div className="col-6 col-md-3">
                      <ul>
                        <li className="mb-3 fw-bold">Enquiry Number:</li>
                        <li className="mb-3 fw-bold">Customer name:</li>
                        <li className="mb-3 fw-bold">Order Generate:</li>
                      </ul>
                    </div>
                    <div className="col-6 col-md-9">
                      <ul>
                        <li className="mb-3 fw-bold">#55556566555</li>
                        <li className="mb-3 fw-bold">Customer name</li>
                        <li className="mb-3 fw-bold">23-5-2022 11:30 Am</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3>Room Description</h3>
            <div className="row mb-5">
              <div className="col-xl-12">
                <h5 className="text-primary">Family</h5>
                <div className="card">
                  <div className="card-body  ">
                    <div className="row">
                      <div className="col-12 col-md-6 col-xl-4">
                        <img
                          src="./images/Rectangle 249.jpg"
                          className="order-img"
                          alt=""
                        />
                      </div>
                      <div className="col-12 col-md-6 col-xl-4">
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <th scope="row">lining</th>
                              <td>Blackout</td>
                            </tr>
                            <tr>
                              <th scope="row">Material</th>
                              <td>Lining Fabric</td>
                            </tr>
                            <tr>
                              <th scope="row">Brand</th>
                              <td>Product Brand</td>
                            </tr>
                            <tr>
                              <th scope="row">Colour</th>
                              <td>Product Colour</td>
                            </tr>
                            <tr>
                              <th scope="row">Width</th>
                              <td>Width, Repeat H, Repeat V</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-12 col-md-6 col-xl-4">
                        <span className="badge bg-primary px-md-5 px-4 py-3 fs-4 rounded mt-0 mt-lg-3 mt-xl-0 mt-md-3">
                          Requried fabric: 234 meter
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h5 className="text-primary">Daughter room</h5>
            <div className="card">
              <div className="card-body  ">
                <div className="row">
                  <div className="col-12 col-md-6 col-xl-4">
                    <img
                      src="./images/Rectangle 249.jpg"
                      className="order-img"
                      alt=""
                    />
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <th scope="row">lining</th>
                          <td>Blackout</td>
                        </tr>
                        <tr>
                          <th scope="row">Material</th>
                          <td>Lining Fabric</td>
                        </tr>
                        <tr>
                          <th scope="row">Brand</th>
                          <td>Product Brand</td>
                        </tr>
                        <tr>
                          <th scope="row">Colour</th>
                          <td>Product Colour</td>
                        </tr>
                        <tr>
                          <th scope="row">Width</th>
                          <td>Width, Repeat H, Repeat V</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <span className="badge bg-primary px-md-5 px-4 py-3 fs-4 rounded mt-0 mt-lg-3 mt-xl-0 mt-md-3">
                      Requried fabric: 234 meter
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center my-4">
              <Link
                to={"/DispatchTeam-product-confirmation"}
                className="btn btn-primary rounded-pill px-5 mb-3"
              >
                Order confirm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DispatchTeamProductDesc;
