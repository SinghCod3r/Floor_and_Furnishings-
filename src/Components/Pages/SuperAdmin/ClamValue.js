import React, { useState } from "react";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { Navigate, useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import Loader from "../../Common/Loader";
import moment from "moment";

function ClamValue() {
  const navigate = useNavigate();
  const [callApi, setCallApi] = useState(false);
  // const { data, Error, isLoading } = useFetch("superadmin/get/enquiries");
  const [totalPage, settotalPage] = useState(0);
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [SearchValue, setSearchValue] = useState("");
  const [Values, setValues] = useState("");
  const getSearchValue = (val) => {
    console.log("vall", Values);
    setisLoading(true);
    GetDataWithToken(`sales/get-customer/?data=${Values}&page=1`).then(
      (response) => {
        if (response.status === true) {
          setdata(response.data);
          setisLoading(false);
          settotalPage(response.pages);
          setisLoading(false);
        }
        setisLoading(false);
      }
    );
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
                  <div className="card-header">
                    <h4 className="card-title">Get Clam Value</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="search Customer by name,phone or email"
                          onChange={(e) => setValues(e.target.value)}
                        />
                        <button
                          className="btn btn-primary"
                          onClick={(e) => getSearchValue(e)}
                          style={{ minWidth: 200, marginLeft: 20 }}
                        >
                          Search Customer
                        </button>
                      </div>
                      <table
                        id="example4"
                        className="table card-table display mb-4 shadow-hover table-responsive-lg"
                        style={{ minWidth: "845px" }}
                      >
                        <thead>
                          <tr>
                            <th>Customer id</th>
                            <th>Customer Name</th>
                            <th>Customer Mobile No.</th>
                            <th>Email</th>
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
                                  <th>{data.customer?.id}</th>
                                  <th>
                                    {data?.customer?.firstName}
                                    {data?.customer?.lastName}
                                  </th>
                                  <th>{data?.customer?.primary_phone}</th>
                                  <td>{data?.customer?.primary_email}</td>
                                  {/* <td>
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
                                  </td> */}
                                  <td>
                                    <button
                                      onClick={() => {
                                        navigate("/CustomerDetialsGetValues", {
                                          state: { data: data?.customer.id },
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

export default ClamValue;
