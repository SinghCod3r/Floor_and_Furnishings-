import { useLocation } from "react-router-dom";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { useEffect, useState } from "react";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";

const CustomerComplaintDetail = () => {
  // const [feedbackList, setFeedbackList] = useState([]);
  const location = useLocation();
  console.log("locooooo....", location);

  let feedbacks = location?.state?.data?.description && JSON.parse(location?.state?.data?.description);
  // const feedbackList = JSON.parse(feedbacks);
  // useEffect(() => {
  //   GetDataWithToken(`customer/get-feedback?enquiryId=${location?.state?.data?.enquiry?.id}`).then(response => {
  //     console.log(response.data);
  //     setFeedbackList(response.data.description);
  //   })
  // }, [])
  // console.log(feedbackList?.[0]);
  // let parsedData = JSON.parse(feedbackList[0]?.description);
  // console.log(JSON.parse(feedbackList[0]?.description));
  return (
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
                  <h4 className="card-title">feedbacks:</h4>
                </div>
                {/* <div className="card-body">
                  <div>
                    Customer Complaints :
                    {location?.state?.data?.complaint_info &&
                      JSON.parse(location?.state?.data?.complaint_info).map((data) => <strong className="mx-2" >{data?.type}</strong >)
                    }
                  </div>

                </div> */}
                <div className="card-body">
                  <div className="mb-2">
                    Customer Feedbacks :
                  </div>
                  {/* By following these steps and considering potential issues, you should be able to resolve the "map is not a function" error in your code. */}
                  <div>
                    {feedbacks?.length == 0 ? <div> <strong> Feedback not given </strong></div> :
                      feedbacks?.map((data, index) =>
                        <div>
                          <div><strong>{data?.ques}</strong></div>
                          <div><p>{data?.ans}</p></div>
                        </div>
                      )}
                  </div>
                  {/* <div className="table-responsive">
                                        <table
                                            id="example4"
                                            className="table card-table display mb-4 shadow-hover table-responsive-lg"
                                            style={{ minWidth: "845px", textAlign: "center" }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Enq. No.</th>
                                                    <th>Customer Name</th>
                                                    <th>Mobile No.</th>
                                                    <th>Status</th>
                                                    <th>Complaints</th>
                                                    <th>Issue Date</th>
                                                    <th>Resolve Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>


                                                {isLoading && <Loader />}
                                                {data && data.length === 0 ? (
                                                    <h3
                                                        style={{
                                                            position: "absolute",
                                                            left: "40%",
                                                            padding: "10px",
                                                        }}
                                                    >
                                                        No data found
                                                    </h3>
                                                ) : (
                                                    data?.map((data, index) => (
                                                        <tr>
                                                            <>
                                                                <th>{data?.enquiry?.id}</th>
                                                                <th>
                                                                    {data?.enquiry?.customer?.firstName}
                                                                    {data?.enquiry?.customer?.lastName}
                                                                </th>
                                                                <th>{data?.enquiry?.customer?.primary_phone}</th>
                                                                <td>
                                                                    <span
                                                                        className={
                                                                            data?.status === "inprogess"
                                                                                ? "badge  badge-primary"
                                                                                : "badge badge-dark"
                                                                        }
                                                                    >
                                                                        {data?.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    {data?.complaint_info &&
                                                                        JSON.parse(data?.complaint_info)?.length
                                                                </td>
                                                                <td>
                                                                    {moment(data?.createdAt).format("DD/MM/YYYY")}
                                                                </td>
                                                                <td>
                                                                    {moment(data?.date).format("DD/MM/YYYY")}
                                                                </td>
                                                                <td>
                                                                    <Link className="btn btn-primary" to="/customer-feedback/complaint-detail" state={{ data: data }} >View</Link>
                                                                </td>
                                                            </>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div> */}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
export default CustomerComplaintDetail; 