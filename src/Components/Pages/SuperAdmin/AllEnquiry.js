import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import Loader from "../../Common/Loader";
import PaginationComponent from "../../Common/PaginationComponent";
import useFetch from "../../Hooks/CallBack";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { useInView } from "react-intersection-observer";
import DateModal from "../../Common/DateModal";
import OrdersModal from "../../Common/OrdersModal";

function AllEnquiry() {

  const navigate = useNavigate();
  const [callApi, setCallApi] = useState(true);
  // const { data, Error, isLoading } = useFetch("superadmin/get/enquiries");
  // const [totalPage, settotalPage] = useState(0);
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [SearchValue, setSearchValue] = useState("");
  const { ref: myRef, inView: visibleElement } = useInView();
  const [openModal, setOpenModal] = useState(false);
  const modalToggle = () => { setOpenModal(!openModal) };
  const [date, setDate] = useState({
    fromDate: '',
    toDate: '',
  });
  const [showStatus, setShowStatus] = useState("");
  // const [showDay,setShowDay]=useState(false);

  // const handlePageClick = (e, index) => {
  //   e.preventDefault();
  //   setCurrentPage(index + 1);
  //   setCallApi(true);
  // };

  const options = [
    { label: "Select Status", value: "" },
    // { label: "Add category", value: "add-category" },
    { label: "Completed", value: "completed" },
    { label: "Fresh", value: "fresh" },
    { label: "Measurement Complete", value: "measurement-complete" },
    { label: "Estimate Created", value: "estimate-created" },
    { label: "Order Confirmed", value: "order-confirmed" },
    { label: "QC Complete", value: "qc-complete" },
    { label: "Installer Assigned", value: "installer-assigned" },
    { label: "Installation Started", value: "installation-started" },
    { label: "Measurer Assigned", value: "measurer-assigned" },
    { label: "Estimate postpone", value: "estimate-postpone" },
    { label: "Cancelled", value: "cancelled" }
  ];

  let fromDate = date?.fromDate ? moment(date?.fromDate, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")?.format("YYYY-MM-DD") : '';
  let toDate = date?.toDate ? moment(date?.toDate, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")?.format("YYYY-MM-DD") : '';

  useEffect(() => {
    if (visibleElement || callApi || showStatus) {
      setCurrentPage((prevData => prevData + 1));
      //  http://203.115.102.6:6696/api/v1/superadmin/get/enquiries?page=1     
      GetDataWithToken(`superadmin/get/enquiries?page=${currentPage}&dateFrom=${fromDate}&dateTo=${toDate}&status=${showStatus}`).then(
        (response) => {
          if (response.status === true) {
            setCallApi(false);
            setdata(prevData => [...prevData, ...response.data]);
            // setdata(response.data);
            setisLoading(false);
            // settotalPage(response.pages);
          }
        }
      );
    }
  }, [visibleElement, callApi, showStatus]);

  const showListByStatusHandler = (e) => {
    console.log("show statusss...", e.target.value);
    setCurrentPage(1);
    setdata([]);
    setShowStatus(e.target.value);
  }

  const getSearchValue = (val) => {
    setisLoading(true);
    GetDataWithToken(
      `superadmin/search-enquiry/?id=${SearchValue?.target?.value}`
    ).then((response) => {
      if (response.status === true) {
        setdata(response.data);
        setisLoading(false);
        // settotalPage(response.pages);
        setisLoading(false);
      }
      setisLoading(false);
    });
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
          {/* row */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header flex align-items-center">
                    <div className="col-lg-5 d-flex align-items-center gap-3">
                      <h4 className="card-title">All Enquiry</h4>
                      <div className="col-lg-8">
                        <select className="form-control" onChange={showListByStatusHandler}>
                          {options.map((option, index) => (
                            <option key={index} value={option?.value}>{option?.label}</option>
                          ))}
                        </select>
                      </div>

                    </div>
                    <div className="col-lg-5 d-flex  align-items-center">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search enquiry by ID"
                        value={SearchValue?.target?.value}
                        onChange={(e) => {
                          setSearchValue(e);
                        }}
                      />
                      <button
                        className="btn btn-primary ms-2 py-2 px-4"
                        onClick={() => getSearchValue()}
                      >
                        Search
                      </button>
                      <button
                        className="btn btn-primary ms-2 py-2 px-4"
                        onClick={modalToggle}
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
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
                            <th>Status</th>
                            <th>Category</th>
                            <th>IC</th>
                            <th>Date</th>
                            {/* <th>Overdue</th> */}
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {console.log("length", AllEnquiry.length)} */}

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
                            data.map((data, index) => (
                              <tr>
                                <>
                                  <th>{data.enquiryId}</th>
                                  <th>
                                    {data?.customer?.firstName}{" "}
                                    {data?.customer?.lastName}
                                  </th>
                                  <th>{data?.customer?.primary_phone}</th>
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
                                    {data?.products.map((i, index) => {
                                      return (
                                        <p
                                          style={{
                                            padding: 0,
                                            lineHeight: 1,
                                            marginBottom: 2,
                                          }}
                                        >{`${i},`}</p>
                                      );
                                    })}
                                  </td>
                                  <td>
                                    {data?.user?.firstName}
                                    {data?.user?.lastName}
                                  </td>

                                  <td>
                                    {moment(data?.createdAt).format("DD/MM/YYYY")}
                                  </td>
                                  {/* <td>{moment(data?.overdueDate)?.format('DD/MM/YYYY') === 'Invalid date' ? data?.overdueDate : moment(data?.overdueDate)?.format('DD/MM/YYYY')}</td> */}
                                  {/* 
                                  <td>{data?.overdue} {data?.overdue && typeof data?.overdue === 'number' && "days"}</td> */}
                                  <td>
                                    <button
                                      onClick={() => {
                                        navigate(`/EnquiryDetials/${data?.id}`, {
                                          state: {
                                            data: data.id,
                                            category: data?.products,
                                            icPerson: `${data?.user?.firstName} ${data?.user?.lastName}`,
                                          },
                                        });
                                      }}
                                      className="btn btn-primary btn-sm"
                                    >
                                      View More
                                    </button>
                                    {/* <a
                                    href="Schedule.html"
                                    className="btn btn-primary btn-sm"
                                  >
                                    Enquiry Assignment
                                  </a> */}
                                  </td>
                                </>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div ref={myRef} id="scroll"></div>
                    {/* <PaginationComponent
                      totalPage={totalPage}
                      currentPage={currentPage}
                      setCallApi={(val) => setCallApi(val)}
                      setCurrentPage={(val) => setCurrentPage(val)}
                      handlePageClick={handlePageClick}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrdersModal
        openModal={openModal}
        modalToggle={modalToggle}
        date={date}
        setDate={setDate}
        enquiryFilter="enquiryFilter"
        setMainData={setdata}
        setIsLoading={setisLoading}
        setMainCallApi={setCallApi}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default AllEnquiry;
