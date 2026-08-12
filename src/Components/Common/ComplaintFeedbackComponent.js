import { toast } from "material-react-toastify";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { GetDataWithToken, PostDataWithToken, PutDataWithToken } from "../ApiHelper/ApiHelper";
import { Link, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Swal from "sweetalert2";
import Loader from "./Loader";
import moment from "moment";

export default function ComplaintFeedbackComponent({ storeId }) {
  // const navigate = useNavigate();

  const [complaintdata, setComplaintData] = useState([]);
  const [complaintDetail, setComplaintDetail] = useState([]);
  const [currentPage, setCurrentPage] = useState({
    complaintCurrentPage: 1,
    feedbackCurrentPage: 1
  });
  const [customerDetail, setCustomerDetail] = useState();
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tabOpen, setTabOpen] = useState("1");
  const [modalOpen, setModalOpen] = useState(false);
  const modalTogggle = () => setModalOpen(!modalOpen);
  const navigate = useNavigate();
  const { ref: myComplaintRef, inView: complaintvisibleElement } = useInView();
  const { ref: myFeedbackRef, inView: feedbackvisibleElement } = useInView();

  const setTabValue = (value) => {
    setTabOpen(value);
    // tabOpen === "1" ? setInvoiceType('CREDIT_NOTE') : setInvoiceType('INVOICES');
    // setCallApi(true);
    // setInvoiceData([]);
    // setIsLoading(true);
    // setCurrentPage(1);
  };

  const completeComplaintHandler = () => {
    // console.log("cccmplaintt", complaintDetail);
    Swal.fire({
      title: "Do you want to send feedback message?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Send",
      // denyButtonText: `Don't dont send`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        PutDataWithToken(
          `superadmin/complaint-resolved/${customerDetail?.id}`
        ).then((response) => {
          if (response.status === true) {
            toast.success("Complaint completed successfully");
          } else {
            toast.error(response.message);
          }
        });
        // Swal.fire('Saved!', '', 'success')
      }
    });
  };

  const complaintDetailHandler = (data) => {
    navigate(storeId ? "/outletComplaintDetail" : "/ComplaintDetials", {
      state: { data: data },
    });

    // setCustomerDetail(data);

    // const result = [];
    // const nameToTypeMap = {};

    // for (const item of data?.complaint_info) {
    //   const { material, type } = item;

    //   if (!nameToTypeMap[material.name]) {
    //     nameToTypeMap[material.name] = type;
    //   } else {
    //     // If the name already exists in the map, append the type
    //     nameToTypeMap[material.name] += `, ${type}`;
    //   }
    // }
    // // Create the result array based on the nameToTypeMap
    // for (const name in nameToTypeMap) {
    //   const type = nameToTypeMap[name];
    //   result.push({ name, type });
    // }
    // console.log("prev...", data.complaint_info);
    // console.log("new....", result);
    // setComplaintDetail(result);

    // modalTogggle();
  };


  useEffect(() => {
    if (complaintvisibleElement) {
      setCurrentPage((prevData => ({
        ...prevData,
        complaintCurrentPage: prevData?.complaintCurrentPage + 1
      })));
      complaintList(currentPage?.complaintCurrentPage)
    }
    if (feedbackvisibleElement) {
      setCurrentPage((prevData => ({
        ...prevData,
        feedbackCurrentPage: prevData?.feedbackCurrentPage + 1
      })));
      feedbackList(currentPage?.feedbackCurrentPage)
    }
  }, [
    complaintvisibleElement, feedbackvisibleElement
  ])

  useEffect(() => {



  }, []);

  const feedbackList = (pageNo) => {
    GetDataWithToken(`customer/get-feedback?pageNo=${pageNo}&pageSize=${10}${storeId ? `&storeId=${storeId}` : ""}`).then((response) => {
      setFeedbackData((prev) => [...prev, ...response.data]);
    });
  }

  const complaintList = (pageNo) => {
    GetDataWithToken(`superadmin/get-customer-complaints?pageNo=${pageNo}&pageSize=${10}${storeId ? `&storeId=${storeId}` : ""}`).then((response) => {
      console.log("comppp...", response?.data?.complaint_task)
      setComplaintData((prev) => [...prev, ...response?.data?.complaint_task]);
      setIsLoading(false);
    });
  }

  return (
    <>
      <div className="content-body">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">

              {/*--- row ---*/}
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Complaints</h4>
                        <Link to={storeId ? "/outletCustomers" : "/all-customer"} className="btn btn-primary" >Add Complaint</Link>
                      </div>
                      <div className="card-body">
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              className={tabOpen === "1" ? "active" : ""}
                              onClick={() => setTabValue("1")}
                            >
                              COMPLAINTS
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={tabOpen === "2" ? "active" : ""}
                              onClick={() => setTabValue("2")}
                            >
                              FEEDBACK
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent activeTab={tabOpen}>
                          <TabPane tabId="1">
                            <div className="table-responsive">
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
                                    <th>Enq. Status</th>
                                    <th>Status</th>
                                    {/* <th>Complaints</th> */}
                                    <th>IC Name</th>
                                    <th>Issue Date</th>
                                    {/* <th>Resolve Date</th> */}
                                    <th>Installation Date/Time</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {isLoading && <Loader />}
                                  {!complaintdata?.length ? (
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
                                    complaintdata?.map((data, index) => (
                                      <tr>
                                        <>
                                          <th>{data?.enquiry?.id}</th>
                                          <th>
                                            {data?.enquiry?.customer?.firstName}
                                            {data?.enquiry?.customer?.lastName}
                                          </th>
                                          <th>
                                            {data?.enquiry?.customer?.primary_phone}
                                          </th>
                                          <td>
                                            <span
                                              className={
                                                data?.enquiry?.status === "progress"
                                                  ? "badge  badge-primary"
                                                  : "badge badge-dark"
                                              }
                                            >
                                              {data?.enquiry?.status}
                                            </span>
                                          </td>
                                          <td>
                                            <span
                                              className={
                                                data?.status === "active"
                                                  ? "badge  badge-success"
                                                  : "badge badge-dark"
                                              }
                                            >
                                              {data?.status}
                                            </span>
                                          </td>
                                          {/* <td>
                                                                                {data?.complaint_info &&
                                                                                    JSON.parse(data?.complaint_info)?.length}
                                                                                {data?.complaint_info &&
                                                                            JSON.parse(data?.complaint_info)?.map((data) => <p>{data?.type}</p>)}
                                                                            </td> */}
                                          <td>
                                            {data?.enquiry?.user?.firstName}{" "}
                                            {data?.enquiry?.user?.lastName}
                                          </td>
                                          <td>
                                            {moment(data?.createdAt).format(
                                              "DD/MM/YYYY"
                                            )}
                                          </td>
                                          {/* <td>
                                                                                {moment(data?.date).format("DD/MM/YYYY")}
                                                                            </td> */}
                                          <td>
                                            {moment(data?.date)?.format(
                                              "DD/MM/YYYY"
                                            )}
                                            ({data?.schedule?.start_time} -{" "}
                                            {data?.schedule?.end_time})
                                          </td>
                                          <td>
                                            <button
                                              className="btn btn-primary"
                                              onClick={() =>
                                                complaintDetailHandler(data)
                                              }
                                            >
                                              View
                                            </button>
                                            {/* <Link className="btn btn-primary" to="/customer-feedback&complaint-detail" state={{ data: data }} >View</Link> */}
                                          </td>
                                        </>
                                      </tr>
                                    ))
                                  )}
                                </tbody>
                              </table>
                            </div>
                            <div ref={myComplaintRef} id="scroll"></div>
                          </TabPane>
                          <TabPane tabId="2">
                            <div className="table-responsive">
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
                                    <th>IC Name</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {isLoading && <Loader />}
                                  {feedbackData && feedbackData?.length === 0 ? (
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
                                    feedbackData?.map((data, index) => (
                                      <tr>
                                        <>
                                          <th>{data?.enquiry?.id}</th>
                                          <th>
                                            {data?.enquiry?.customer?.firstName}
                                            {data?.enquiry?.customer?.lastName}
                                          </th>
                                          <th>
                                            {data?.enquiry?.customer?.primary_phone}
                                          </th>

                                          <td>
                                            {data?.enquiry?.user?.firstName}{" "}
                                            {data?.enquiry?.user?.lastName}
                                          </td>
                                          <td>
                                            {moment(data?.createdAt).format(
                                              "DD/MM/YYYY"
                                            )}
                                          </td>
                                          <td>
                                            <Link
                                              className="btn btn-primary"
                                              to="/customer-feedback&complaint-detail"
                                              state={{ data: data }}
                                            >
                                              View
                                            </Link>
                                          </td>
                                        </>
                                      </tr>
                                    ))
                                  )}
                                </tbody>
                              </table>
                              <div ref={myFeedbackRef} id="scroll"></div>
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="card-header">
                                    <h4 className="card-title">Add New User</h4>
                                </div> */}
              {/* <div className="card-body">
                                    <div className="basic-form">
                                        <form onSubmit={handleSubmit(CreateNewUser)}>
                                            <div className="mb-3 row">
                                                <div className="col-lg-6">
                                                    <label className="form-label">Enter First Name</label>
                                                    <input
                                                        {...register("firstName", {
                                                            required: "please Enter First Name",
                                                            maxLength: 80,
                                                        })}
                                                        autocomplete="off"
                                                        type="text"
                                                        className="form-control input-default"
                                                    />
                                                    <span className="font-danger">
                                                        {errors.firstName && errors.firstName.message}
                                                    </span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label className="form-label">Enter Last Name</label>
                                                    <input
                                                        {...register("lastName", {
                                                            required: "please Enter Last Name",
                                                            maxLength: 80,
                                                        })}
                                                        autocomplete="off"
                                                        type="text"
                                                        className="form-control input-default"
                                                    />
                                                    <span className="font-danger">
                                                        {errors.lastName && errors.lastName.message}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <div className="col-lg-6">
                                                    <label className="form-label">Enter Email</label>
                                                    <input
                                                        {...register("email", {
                                                            required: "please Enter Email",
                                                            maxLength: 80,
                                                        })}
                                                        autocomplete="off"
                                                        type="email"
                                                        className="form-control input-default"
                                                    />
                                                    <span className="font-danger">
                                                        {errors.email && errors.email.message}
                                                    </span>
                                                </div>

                                                <div className="col-lg-6">
                                                    <label className="form-label">
                                                        Enter Phone Number
                                                    </label>
                                                    <input
                                                        {...register("phoneNumber", {
                                                            required: "please Enter Phone Number",
                                                            maxLength: 80,
                                                            // pattern: /^[A-Za-z]+$/i,
                                                        })}
                                                        autocomplete="off"
                                                        type="number"
                                                        className="form-control input-default"
                                                    />
                                                    <span className="font-danger">
                                                        {errors.phoneNumber && errors.phoneNumber.message}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <div className="col-lg-12">
                                                    <label className="form-label">Enter Password</label>
                                                    <input
                                                        {...register("password", {
                                                            required: "please Enter Password",
                                                            maxLength: 80,
                                                        })}
                                                        type="password"
                                                        className="form-control input-default"
                                                    />
                                                    <span className="font-danger">
                                                        {errors.password && errors.password.message}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="buttons text-end">
                                                <button className="btn btn-warning  me-2">Back</button>
                                                <button className="btn btn-primary ">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}