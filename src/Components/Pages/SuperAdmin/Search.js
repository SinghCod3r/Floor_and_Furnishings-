import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import SuperAdminHeader from "./Common/SuperAdminHeader";
import SuperAdminSidebar from "./Common/SuperAdminSidebar";

function Search() {
  const navigate = useNavigate();
  // const location = useLocation();
  const [SearchData, setSerachData] = useState("");
  const [AllResultData, setAllResultData] = useState([]);
  const [pages, setPages] = useState("1");

  const getSearchValue = (e) => {
    console.log(e.target.value);
    if (e.target.value.length > 3) {
      GetDataWithToken(
        `sales/get-customer?data=${e.target.value}&page=${pages}`
      ).then((response) => {
        if (response.status === true) {
          setAllResultData(response.data);
          console.log("all result data", response.data);
        }
      });
      setSerachData(e.target.value);
    } else {
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
          {/* row */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="search Customer by name,phone or email"
                  defaultValue={SearchData}
                  onChange={(e) => {
                    getSearchValue(e);
                  }}
                />
                <div className="card mt-3">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        id="example4"
                        className=" table card-table display mb-4 shadow-hover table-responsive-lg"
                      >
                        <thead>
                          <tr>
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {AllResultData.length === 0 && <h4>No Data Find</h4>}
                          {AllResultData &&
                            AllResultData.map((item, index) => {
                              let customer = item.customer;
                              console.log("first", customer.customer);
                              return (
                                <tr key={index}>
                                  <td>{customer.id}</td>
                                  <td>
                                    {customer.firstName} {customer.lastName}
                                  </td>
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

export default Search;
