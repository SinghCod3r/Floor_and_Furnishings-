import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import { Spinner } from "reactstrap";

const CustomerSelectOption = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [EnquiryDetials, setEnquiryDetials] = useState({});
  const [loading, setLoading] = useState(false);
  const [callApi, setCallApi] = useState(true);
  console.log("hllloooo", location.state);
  useEffect(() => {
    if (callApi) {
      setLoading(true);
      GetDataWithToken(`sales/admin/get-enquiry/${location?.state?.orderId.id}?isAdmin=true`).then(
        (response) => {
          if (response.status === true) {
            setCallApi(false);
            setLoading(false);
            setEnquiryDetials(response);
          }
        }
      );
    }

  }, [callApi]);
  return (<>
    <div className="authincation h-100">
      <div className="container h-100vh">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-xl-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="card-header">
                    <h4>Select option to view</h4>
                    <span onClick={() => { navigate(-1) }} style={{ cursor: "pointer" }}><i className="fas fa-arrow-left" style={{ fontSize: "20px" }}></i></span>
                  </div>
                  <div className="container-fluid">
                    <div className="row flex-item-center">
                      <div className="col-xl-12">
                        {loading ? <div className="d-flex align-items-center justify-content-center p-3">
                          <Spinner />
                        </div> :
                          <div className="d-flex row p-5 mx-2">
                            <Link
                              //   data-bs-toggle="modal"
                              //   data-bs-target="#exampleModalCenter"
                              className="btn btn-mybutton"
                              to="/customer-status-detail"
                              state={EnquiryDetials}

                            >
                              View Status
                            </Link>
                            {location?.state?.orderId.status === "completed" && <Link
                              className="btn btn-mybutton"
                              state={{ data: location?.state?.orderId }}
                              to="/customer-complaint-category"
                            >
                              Complaint
                            </Link>}
                            {location?.state?.orderId.status === "completed" && <Link
                              className="btn btn-mybutton"
                              //   data-bs-toggle="modal"
                              //   data-bs-target=".bd-example-modal-lg-2"
                              to="/customer-feedback"
                              state={location?.state}
                            >
                              Feedback
                            </Link>}

                            {location?.state?.orderId.status === "qc-complete" ||
                              location?.state?.orderId.status === "inprogess" ? < Link
                                to="/customer-assign-mearurer"
                                className="btn btn-mybutton"
                                state={{ EnquiryDetials: EnquiryDetials.data }}
                              >
                              Assign Measurer
                            </Link> : ""}

                            {location?.state?.orderId.status === "measurement-complete" || location?.state?.orderId.status === "qc-complete" ? <Link
                              className="btn btn-mybutton"
                              //   data-bs-toggle="modal"
                              //   data-bs-target=".bd-example-modal-lg"
                              to="/customer-assign-installer"
                              state={EnquiryDetials}
                            >
                              Assign Installer
                            </Link> : ""}
                            {location?.state?.orderId.status !== "fresh" ||
                              location?.state?.orderId.status !== "cancelled" || location?.state?.orderId.status !== "inprogess" ?
                              <Link
                                className="btn btn-mybutton"
                                to="/customer-view-estimate"
                                state={{ EnquiryDetials: EnquiryDetials.data }}
                              >
                                View Estimate
                              </Link> : ""}
                          </div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >


  </>)
}
export default CustomerSelectOption;