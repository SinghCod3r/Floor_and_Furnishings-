
import { useEffect, useState } from "react";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import moment from "moment";

function SearchEnquiry() {

  const [enquiryId, setEnquiryId] = useState('');
  const [enquiryMail, setEnquiryMail] = useState('');
  const [callApi, setCallApi] = useState(false);
  const [inval, setInval] = useState(0);
  const [EnquiryDetials, setEnquiryDetials] = useState();
  useEffect(() => {
    if (callApi) {
      GetDataWithToken(`sales/admin/get-enquiry/${enquiryId}?isAdmin=true`).then(response => {
        if (response.status === true) {
          console.log(response.data);
          setCallApi(false);

          if (enquiryMail === response?.data?.customer?.primary_email) {
            setEnquiryDetials(response);
            setInval(1);
          } else {
            setInval(2);

          }
        }
        setCallApi(false);
      })
    }
  }, [callApi])

  const submitHandler = () => {
    setCallApi(true);
  }
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
          {<div className="container-fluid">
            <div className="row">
              <div className="col-xl-11">
                <div className="card">
                  <div className="card-body">
                    <div>
                      <div>
                        <label> PLEASE ENTER EMAIL</label>
                        <input type="email" className="me-sm-2  form-control" onChange={(e) => setEnquiryMail(e.target.value)} />
                      </div>
                      <div>
                        <label> PLEASE ENTER ENQUIRY NUMBER</label>
                        <input type="number" className="me-sm-2  form-control" onChange={(e) => setEnquiryId(e.target.value)} />
                      </div>
                      <div>
                        <button className="btn btn-primary mt-2" onClick={submitHandler}>Submit</button>
                      </div>
                    </div>
                    <div >
                    </div>

                  </div>

                  {inval === 1 && <div className="card">
                    <div className="card-body">
                      <h4 className="card-intro-title">Enquiry No.</h4>
                      <div
                        id="DZ_W_TimeLine"
                        className="widget-timeline dlab-scroll"
                      >
                        <ul className="timeline">
                          {EnquiryDetials?.data?.enquirystatuses &&
                            EnquiryDetials?.data?.enquirystatuses.map(
                              (item, index) => {
                                return (
                                  <li>
                                    <div className="timeline-badge primary" />
                                    <a
                                      className="timeline-panel text-muted"
                                      href="#"
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
                  </div>}

                  {inval === 2 &&
                    <div className="card">
                      <h3
                        style={{
                          position: "absolute",
                          left: "30%",
                        }}
                      >
                        Please enter a valid email address or customer ID
                      </h3>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>}

        </div>
      </div>
    </>
  )
}
export default SearchEnquiry;