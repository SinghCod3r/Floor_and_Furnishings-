import React, { useEffect, useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { data } from "jquery";
import moment from "moment";

function EnquiryProductList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [EnquiryDetials, setEnquiryDetials] = useState([]);
  useEffect(() => {
    console.log("location", location.state.data);
    GetDataWithToken(`sales/enq-detail/${location.state.data}`).then(
      (response) => {
        setEnquiryDetials(response);
      }
    );
  }, [""]);

  const GetBuyBackValue = (amount) => {
    if (amount) {
      const value = amount;

      // Create two Moment.js objects representing the dates
      const startDate = moment();
      const endDate = moment(EnquiryDetials?.enquiryDate);
      //   const days = startDate.diff(endDate, "days");
      const days = 242;
      console.log(days);

      if (days >= 180 && days <= 240) {
        const finalAmount = amount - (amount * 20) / 100;
        console.log("finalAmount", finalAmount);
        return Math.round(finalAmount);
      } else if (days >= 241 && days <= 300) {
        const finalAmount = amount - (amount * 30) / 100;
        console.log("finalAmount", finalAmount);
        return Math.round(finalAmount);
      } else {
        const finalAmount = amount - 0 / 100;
        // console.log("finalAmount", finalAmount);
        return finalAmount;
      }
    }
  };

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
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header border-0">
                    <h4 className="fs-20">Purchase History</h4>
                    <div className="newest ms-3">
                      {/* <input type="date" className="default-select"  /> */}
                    </div>
                  </div>
                  <div>
                    <div className="table-responsive">
                      <table
                        className="table card-table display mb-4 shadow-hover table-responsive-lg"
                        id="guestTable-all"
                      >
                        <thead>
                          <tr>
                            <th>Date of Purchase</th>
                            <th>Item Id</th>
                            <th>Fabric</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Net Amount</th>
                            <th>Refund Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <h4 style={{ padding: 20 }}>Curtain</h4>
                          {EnquiryDetials.curtain &&
                            EnquiryDetials.curtain.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  {moment(EnquiryDetials?.enquiryDate).format(
                                    "ll"
                                  )}
                                </td>
                                <td>{item.item_id}</td>
                                <td>{item.fabric}</td>
                                <td>{item?.type}</td>
                                <td>{item?.qty}</td>
                                <td>{item?.netAmount}</td>
                                <th>{GetBuyBackValue(item?.netAmount)}</th>
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
      </div>
    </>
  );
}

export default EnquiryProductList;
