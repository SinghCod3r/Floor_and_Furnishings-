import React from "react";
import DispatchTeamHeader from "./DispatchTeamHeader";
import DispatchTeamSidebar from "./DispatchTeamSidebar";

function DispatchTeamProductConfirmation() {
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
            <h3>Order Confirmation</h3>
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
            {/* table  */}
            <div className="table-responsive mb-5">
              <table className="table table-borderless">
                <tbody className="">
                  <tr>
                    <th>Room / Room description</th>
                    <th>Fabric type</th>
                    <th>Fabric Qty meter</th>
                  </tr>
                  <tr className="mb-4 bg-white">
                    <td className="text-primary">Family room</td>
                    <td className="text-secondary">
                      Lining fabric sheet fabric
                    </td>
                    <td className="text-primary">L 23 meter, s 10 meter</td>
                  </tr>
                  <tr className=" bg-white">
                    <td className="text-primary">Daughter room</td>
                    <td className="text-secondary">
                      Lining fabric sheet fabric
                    </td>
                    <td className="text-primary">L 13 meter, s 10 meter</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* table close */}
            <div className="row">
              <div className="col-12 col-md-6  col-lg-5 col-xl-4 offset-0 offset-md-6 offset-lg-7 offset-xl-8 text-end">
                <div className="table-responsive">
                  <table className="table table-borderless">
                    <tbody className="">
                      <tr>
                        <td>Total Requried fabric of lining </td>
                        <th>23 meter</th>
                      </tr>
                      <tr>
                        <td>Total Requried fabric of sheet</td>
                        <th>10 meter</th>
                      </tr>
                      <tr className="border-top border-primary pt-4">
                        <th>Grand total</th>
                        <th>33 meter</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="text-center my-4">
              <button
                type="button"
                className="btn btn-primary roubded-pill px-5 mb-3"
                data-bs-toggle="modal"
                data-bs-target="#GenerateQR"
              >
                {" "}
                Generate QR and Send
              </button>
            </div>
          </div>
          {/*----- Content body end -----*/}
        </div>
      </div>
    </>
  );
}

export default DispatchTeamProductConfirmation;
