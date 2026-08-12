import { useLocation, useNavigate } from "react-router-dom";


const CustomerEnquiryList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const enquiries = location.state.data;

  return (
    <>
      <div className="authincation h-100">
        <div className="container h-100vh">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-12">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div class="alert bg-secondary mx-1 mt-2 mb-2"><div class="row">
                      <div class="col-xl-10">
                        <h3 class="text-white">Hello {enquiries?.firstName} {enquiries?.lastName} Choose a enquiry</h3>
                      </div>
                    </div>
                    </div>
                    <div className="table-responsive">
                      {enquiries?.enquiries.length > 0 ? <table
                        id="example4"
                        className="table card-table display mb-4 shadow-hover table-responsive-lg"
                      // style={{ minWidth: "845px" }}
                      >
                        <thead>
                          <tr>
                            <th>Enquiry No.</th>
                            <th>Status</th>
                            {/* <th>Category</th> */}
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {enquiries?.enquiries?.map((data) => <tr>
                            <td>{data?.enquiryId}</td>
                            <td>{data?.status}</td>
                            {/* <td>
                                    
                                  </td> */}
                            <td>
                              <button className="btn btn-primary"
                                onClick={() => navigate("/customer-options", {
                                  state: {
                                    orderId: data,
                                  }
                                })}
                              >

                                View

                              </button>
                            </td>
                          </tr>)}
                        </tbody>
                      </table> : <div><h3 style={{ textAlign: "center" }}>No enquiries found</h3></div>}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CustomerEnquiryList;