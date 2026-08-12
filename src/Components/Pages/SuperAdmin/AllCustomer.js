import { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import Loader from "../../Common/Loader";
import useFetch from "../../Hooks/CallBack";
// import DataTableBase from "./Common/DataTablebasic";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";
import { current } from "@reduxjs/toolkit";
import { useInView } from "react-intersection-observer";


function AllCustomer() {
  const { ref: myRef, inView: visibleElement } = useInView();
  const [totalPage, settotalPage] = useState(1);
  const [searchData, setSearchData] = useState('');
  const [data, setData] = useState([]);
  const [callApi, setCallApi] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const searchDataHandler = () => {
    setCurrentPage(1);
    console.log(searchData);
    setCallApi(true);
    setIsLoading(true);
    setData([]);
  }
  useEffect(() => {
    if (callApi || visibleElement) {
      setIsLoading(true);
      GetDataWithToken(`superadmin/get-customers?fullName=${searchData}&pageNo=${currentPage}&pageSize=10`)
        .then((response) => {
          if (response.status === true) {
            settotalPage(response?.pageInfo?.totalPage);
            setCurrentPage(currentPage + 1);
            setData(prevData => [...prevData, ...response.data]);
            currentPage <= totalPage && setCurrentPage((prevPage) => prevPage + 1);
            setCallApi(false);
            setIsLoading(false);

          }
        })
    }
  }, [callApi, visibleElement])

  // const { data, Error, isLoading } = useFetch("");

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
          {/*-- row --*/}
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">All Customers</h4>
                    <div className="col-lg-7 d-flex">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        onChange={(e) => {
                          setSearchData(e.target.value);
                        }}
                      />
                      <button className="btn btn-primary ms-2 py-1"
                        onClick={searchDataHandler}
                      >Search
                      </button>
                    </div>
                    {/* <button className=""></button> */}
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        id="example4"
                        className=" table card-table display mb-4 shadow-hover table-responsive-lg"
                      >
                        <thead>
                          <tr>
                            <th>Customer Name</th>
                            <th>Customer ID</th>
                            <th>Primary Email</th>
                            <th>Mobile Number</th>

                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {isLoading && <Loader />}
                          {data && !isLoading && data.length === 0 && (
                            <h3
                              style={{
                                position: "absolute",
                                left: "40%",
                                padding: "10px",
                              }}
                            >
                              No data found
                            </h3>
                          )}
                          {data.map((customer, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {customer.firstName} {customer.lastName}
                                </td>
                                <td>{customer.ACCOUNTNUM}</td>
                                <td>{customer.primary_email}</td>
                                <td>{customer.primary_phone}</td>

                                <td>
                                  <button
                                    onClick={() => {
                                      navigate("/customer-detials", {
                                        state: { data: customer.id },
                                      });
                                    }}
                                    className="btn btn-primary"
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {data?.length > 0 && currentPage <= totalPage && <div ref={myRef} id="scroll"></div>}
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

export default AllCustomer;
