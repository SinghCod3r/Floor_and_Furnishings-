import { useEffect, useState } from "react";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const CustomerStatusDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let EnquiryDetials = location?.state;

  console.log("connnn...", EnquiryDetials)

  return (
    <div className="authincation h-100">
      <div className="container h-100vh">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-xl-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="card-header">
                    <h4>Status Detail</h4>
                    <span onClick={() => { navigate(-1) }} style={{ cursor: "pointer" }}><i className="fas fa-arrow-left" style={{ fontSize: "20px" }}></i></span>
                  </div>

                  <div className="row flex-item-center">
                    <div className="col-xl-12">
                      <div className="d-flex row mx-2">
                        <div className="card">
                          <div className="card-body">
                            <h4 className="card-intro-title">Enquiry No.</h4>
                            <div
                              id="DZ_W_TimeLine"
                              className="widget-timeline dlab-scroll"
                            >
                              <ul className="timeline">
                                {EnquiryDetials?.data?.enquirystatuses &&
                                  EnquiryDetials?.data?.enquirystatuses?.map(
                                    (item, index) => {
                                      return (
                                        <li>
                                          <div className="timeline-badge primary" />
                                          <a
                                            className="timeline-panel text-muted"
                                          // href="#"
                                          >
                                            <span className="text-white">
                                              {moment(item.createdAt).format("LLL")}
                                            </span>
                                            <h6 className="mb-0 text-white">
                                              {item.remark} #{item.enquiryId}
                                              {/* <strong className="text-primary"></strong>. */}
                                            </h6>
                                          </a>
                                        </li>
                                      );
                                    }
                                  )}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-primary" onClick={() => navigate(-1)}>back</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerStatusDetail;