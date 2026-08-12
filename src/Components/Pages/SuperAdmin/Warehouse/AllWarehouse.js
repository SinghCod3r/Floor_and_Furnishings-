import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminHeader from "../Common/SuperAdminHeader";
import SuperAdminSidebar from "../Common/SuperAdminSidebar";
import useFetch from "../../../Hooks/CallBack";
import CreateWareHouseModal from "./CreateWareHouseModal";
import Loader from "../../../Common/Loader";

export const AllWarehouse = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { data, isLoading, error } = useFetch("superadmin/warehouses");

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
                    <h4 className="card-title">All Warehouse</h4>
                    <button
                      className="btn btn-primary"
                      onClick={() => setModal(!modal)}
                    >
                      Add more Warehouse
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        id="example4"
                        className="table card-table display mb-4 shadow-hover table-responsive-lg"
                        style={{ minWidth: "845px" }}
                      >
                        <thead>
                          <tr>
                            <th>Warehouse id</th>
                            <th>Warehouse Name</th>
                            <th>Warehouse Address</th>
                            <th>longitude</th>
                            <th>latitude</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {isLoading && <Loader />}
                          {error && <div>Error</div>}
                          {/* {console.log("data", data)} */}

                          {data.map((outlet, index) => {
                            return (
                              <tr key={index}>
                                <td>{outlet.warehouseId}</td>
                                <td>{outlet.name}</td>
                                <td>{outlet?.location}</td>
                                <td> {outlet?.latitude}</td>
                                <td> {outlet?.longitude}</td>

                                <td>
                                  <button
                                    onClick={() => {
                                      navigate("/OutletDashboard", {
                                        state: { data: outlet.id },
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
        {/* <CreateOutletModal modal={modal} toggle={(val) => toggle(val)} /> */}
        <CreateWareHouseModal modal={modal} toggle={(val) => toggle(val)} />
      </div>
    </>
  );
};
